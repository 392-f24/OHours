import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "../src/pages/landingPage/landingPage";  // Updated correct path

describe("Landing Page Navigation Tests", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
  });

  it("should display landing page with student option and navigate to student page", () => {
    // Verify landing page elements are present
    expect(screen.getByText(/welcome to/i)).toBeInTheDocument();
    expect(screen.getByText("OHours")).toBeInTheDocument();
    
    // Find and click the Students link
    const studentLink = screen.getByRole("link", { name: /students/i });
    expect(studentLink).toHaveAttribute("href", "/student");
    
    // Verify the Staff option is also present
    const staffLink = screen.getByRole("link", { name: /staff/i });
    expect(staffLink).toHaveAttribute("href", "/PMLand");
  });
});