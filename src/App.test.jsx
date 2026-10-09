import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("anniversary surprise", () => {
  it("starts with Patricia identity verification", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /a little question before we begin/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/are you patricia tolentino/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^yes, that's me$/i })
    ).toBeInTheDocument();
  });

  it("walks through the multiple-choice validation questions", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /^yes, that's me$/i }));
    expect(
      screen.getByText(/what is your callsign with gideon magsanoc/i)
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^love$/i }));
    expect(
      screen.getByText(/name of gideon's favorite dog/i)
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^molly$/i }));
    expect(screen.getByText(/heartprint confirmed/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open our story/i })
    ).toBeInTheDocument();
  });

  it("keeps the visitor on a question after a wrong answer", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /^yes, that's me$/i }));
    await user.click(screen.getByRole("button", { name: /^mahal$/i }));

    expect(
      screen.getByText(/close, but that's not our secret answer/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/what is your callsign with gideon magsanoc/i)
    ).toBeInTheDocument();
  });

  it("reveals the anniversary story after validation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /^yes, that's me$/i }));
    await user.click(screen.getByRole("button", { name: /^love$/i }));
    await user.click(screen.getByRole("button", { name: /^molly$/i }));
    await user.click(screen.getByRole("button", { name: /open our story/i }));

    expect(
      screen.getByRole("heading", {
        name: /four years, one favorite love story/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /a letter for you/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /happy 4th anniversary, mahal/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/soundtrack controls/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /watch on youtube/i })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=dCWMpvzMM1Y"
    );
    expect(document.querySelector("audio")).not.toBeInTheDocument();
  });
});
