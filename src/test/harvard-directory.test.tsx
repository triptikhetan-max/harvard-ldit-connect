import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HarvardDirectoryLookup } from "@/components/platform/HarvardDirectoryLookup";

describe("Harvard directory handoff", () => {
  it("opens Harvard's own sign-in without collecting credentials", () => {
    render(<HarvardDirectoryLookup />);
    const link = screen.getByRole("link", { name: "Open Harvard directory" });
    expect(new URL(link.getAttribute("href") ?? "").hostname).toBe("alumni.harvard.edu");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(document.querySelector('input[type="password"]')).toBeNull();
  });

  it("copies the visitor's search criteria for use after Harvard sign-in", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    render(<HarvardDirectoryLookup />);
    fireEvent.change(screen.getByLabelText("Role, company, or interest"), {
      target: { value: "Learning designer" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Copy search checklist" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(expect.stringContaining("Search: Learning designer")),
    );
    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining("School: Harvard Graduate School of Education"),
    );
  });
});
