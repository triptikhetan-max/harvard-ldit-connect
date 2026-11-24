import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PersonalAlumni } from "@/components/platform/PersonalAlumni";
import { PERSONAL_ALUMNI_STORAGE_KEY } from "@/lib/personal-alumni";

const snapshot = {
  capturedAt: "2026-11-24T19:00:00.000Z",
  source: "Harvard Alumni Directory",
  query: "HGSE",
  profiles: [
    {
      name: "Example Person",
      profileUrl: "https://community.alumni.harvard.edu/person/123456",
      education: "EDM 2020",
      headline: "Designer at Example",
    },
  ],
};

afterEach(() => localStorage.clear());

function savedFile(text: string) {
  return Object.assign(new File([text], "saved-alumni.json", { type: "application/json" }), {
    text: async () => text,
  });
}

describe("Browser-local alumni list", () => {
  it("imports, searches, and restores profiles from this browser", async () => {
    const view = render(<PersonalAlumni />);
    fireEvent.change(screen.getByLabelText("Import saved alumni file"), {
      target: { files: [savedFile(JSON.stringify(snapshot))] },
    });
    await screen.findByRole("heading", { name: "Example Person" });
    expect(JSON.parse(localStorage.getItem(PERSONAL_ALUMNI_STORAGE_KEY) ?? "null")).toEqual(
      snapshot,
    );
    fireEvent.change(screen.getByLabelText("Search your saved alumni"), {
      target: { value: "unmatched search" },
    });
    expect(screen.queryByRole("heading", { name: "Example Person" })).toBeNull();
    view.unmount();
    render(<PersonalAlumni />);
    await screen.findByRole("heading", { name: "Example Person" });
  });

  it("keeps the previous list when a new file is invalid", async () => {
    localStorage.setItem(PERSONAL_ALUMNI_STORAGE_KEY, JSON.stringify(snapshot));
    render(<PersonalAlumni />);
    await screen.findByRole("heading", { name: "Example Person" });
    fireEvent.change(screen.getByLabelText("Import saved alumni file"), {
      target: { files: [savedFile("invalid")] },
    });
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("unchanged"));
    expect(screen.getByRole("heading", { name: "Example Person" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(PERSONAL_ALUMNI_STORAGE_KEY) ?? "null")).toEqual(
      snapshot,
    );
  });
});
