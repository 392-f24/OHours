import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import PMLanding from "../src/pages/pmLanding/pmLanding";

vi.mock("react-router-dom", () => {
  const originalModule = vi.importActual("react-router-dom"); // Import the actual module
  return {
    ...originalModule, // Spread all exports to not accidentally omit used exports
    useNavigate: vi.fn(), // Override useNavigate with a mock function
    MemoryRouter: ({ children }) => <div>{children}</div>, // Simplified mock for MemoryRouter
  };
});

vi.mock("../../firebase/pmSideFunctions", () => ({
  fetchAllActiveSessions: vi.fn((cb) => cb(mockSessionsData, null)),
}));

const mockSessionsData = {
  3086: { className: "CS392", pmCode: "8830", queueLength: 1 },
  5514: { className: "Math 240", pmCode: "2872", queueLength: 2 },
  5693: { className: "Art Hist 250", pmCode: "4931", queueLength: 1 },
  7650: { className: "ABC", pmCode: "5287", queueLength: 0 },
  "0000": { className: "CS392", pmCode: "1234", queueLength: 13 },
};

// describe('PMLanding - Joining an Existing Session', () => {
//   it('navigates to create session page on button click', () => {
//       const navigate = vi.fn();
//       vi.mocked(useNavigate).mockImplementation(() => navigate);
//       render(<PMLanding />, { wrapper: MemoryRouter });
//       fireEvent.click(screen.getByText('Create New Session'));
//       expect(navigate).toHaveBeenCalledWith('/pmCreateSess');
//     });

// });

describe("PMLanding table render", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders session data correctly in the table", async () => {
    render(<PMLanding />, { wrapper: MemoryRouter });

    await screen.findByText("CS392"); // Use findByText for the first item to wait for rendering
    expect(screen.getByText("8830")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument(); // Verify specific data points

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1); // Verify that multiple rows are rendered
  });
});
