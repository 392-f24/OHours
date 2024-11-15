import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import StudentCodePage from "../src/pages/studentCodePage/studentCodePage";  // Updated correct path
import * as router from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";

// Mock Firebase functions
vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(),
  ref: vi.fn(),
  get: vi.fn()
}));

// Mock Firebase app
vi.mock("../src/firebase/firebase", () => ({
  app: {}
}));

// Mock react-router-dom's useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn()
  };
});

describe("Student Code Page Tests", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(router.useNavigate).mockReturnValue(navigateMock);
  });

  it("should navigate to form queue when valid code is entered", async () => {
    // Mock successful code verification
    const mockSnapshot = {
      exists: () => true
    };
    vi.mocked(get).mockResolvedValue(mockSnapshot);

    render(
      <BrowserRouter>
        <StudentCodePage />
      </BrowserRouter>
    );

    // Enter valid code
    const codeInput = screen.getByLabelText(/enter access code/i);
    fireEvent.change(codeInput, { target: { value: "1234" } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Verify navigation occurred with correct path
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/formqueue/1234");
    });
  });

  it("should show error message when invalid code is entered", async () => {
    // Mock failed code verification
    const mockSnapshot = {
      exists: () => false
    };
    vi.mocked(get).mockResolvedValue(mockSnapshot);

    render(
      <BrowserRouter>
        <StudentCodePage />
      </BrowserRouter>
    );

    // Enter invalid code
    const codeInput = screen.getByLabelText(/enter access code/i);
    fireEvent.change(codeInput, { target: { value: "9999" } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Verify error message appears
    await waitFor(() => {
      expect(screen.getByText("Invalid code. Please try again.")).toBeInTheDocument();
    });

    // Verify no navigation occurred
    expect(navigateMock).not.toHaveBeenCalled();
  });
});