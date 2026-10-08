import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import OfficialSongPlayer from "./OfficialSongPlayer";

afterEach(() => {
  delete window.YT;
});

describe("official song player", () => {
  it("uses the official video and reports playback progress", async () => {
    let playerOptions;
    const onPlaybackChange = vi.fn();
    const onProgressChange = vi.fn();

    window.YT = {
      PlayerState: { PLAYING: 1, ENDED: 0 },
      Player: class {
        constructor(_target, options) {
          playerOptions = options;
        }

        getDuration() {
          return 200;
        }
        getCurrentTime() {
          return 50;
        }
        destroy() {}
      },
    };

    const { unmount } = render(
      <OfficialSongPlayer
        onPlaybackChange={onPlaybackChange}
        onProgressChange={onProgressChange}
      />
    );

    await waitFor(() => expect(playerOptions).toBeDefined());
    expect(playerOptions.videoId).toBe("dCWMpvzMM1Y");
    expect(
      screen.getByRole("link", { name: /watch on youtube/i })
    ).toHaveAttribute("href", "https://www.youtube.com/watch?v=dCWMpvzMM1Y");

    act(() => playerOptions.events.onStateChange({ data: 1 }));
    expect(onPlaybackChange).toHaveBeenLastCalledWith(true);
    expect(onProgressChange).toHaveBeenLastCalledWith(0.25);

    act(() => playerOptions.events.onStateChange({ data: 0 }));
    expect(onPlaybackChange).toHaveBeenLastCalledWith(false);
    expect(onProgressChange).toHaveBeenLastCalledWith(1);

    unmount();
  });

  it("requests playback on opening and exposes a retry when autoplay is blocked", async () => {
    let playerOptions;
    const playVideo = vi.fn();
    const onAutoplayBlocked = vi.fn();
    const controlRef = { current: null };

    window.YT = {
      PlayerState: { PLAYING: 1, ENDED: 0 },
      Player: class {
        constructor(_target, options) {
          playerOptions = options;
        }
        playVideo = playVideo;
        destroy() {}
      },
    };

    render(
      <OfficialSongPlayer
        autoPlay
        controlRef={controlRef}
        onAutoplayBlocked={onAutoplayBlocked}
        onPlaybackChange={vi.fn()}
        onProgressChange={vi.fn()}
      />
    );

    await waitFor(() => expect(playerOptions).toBeDefined());
    expect(playerOptions.playerVars.autoplay).toBe(1);
    act(() => playerOptions.events.onReady());
    expect(playVideo).toHaveBeenCalledTimes(1);

    act(() => playerOptions.events.onAutoplayBlocked());
    expect(onAutoplayBlocked).toHaveBeenCalledTimes(1);
    act(() => controlRef.current.play());
    expect(playVideo).toHaveBeenCalledTimes(2);
  });
});
