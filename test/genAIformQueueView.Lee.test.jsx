import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import FormQueueView from "../src/pages/formQueue/formQueueView";
import { BrowserRouter } from "react-router-dom";
import {
  getQueue,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getClassName,
} from "../src/firebase/studentSideFunctions";
import * as router from "react-router-dom";

// Mock react-router-dom's useNavigate and useParams
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: () => ({ code: "testCode" }),
  };
});

// Mock the Firebase functions
vi.mock("../src/firebase/studentSideFunctions", () => ({
  getQueue: vi.fn(),
  addQuestion: vi.fn(),
  updateQuestion: vi.fn(),
  deleteQuestion: vi.fn(),
  getClassName: vi.fn(),
}));

describe("Leave Queue Functionality", () => {
  const mockNavigate = vi.fn();
  const questionId = "test-question-id";
  const testStudent = "Test Student";
  const testQuestion = "Test Question";

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(router, "useNavigate").mockReturnValue(mockNavigate);
    window.confirm = vi.fn(() => true);

    // First simulate adding a question
    addQuestion.mockResolvedValue(questionId);
    
    // Then setup the queue state
    getQueue.mockResolvedValue([
      {
        id: questionId,
        name: testStudent,
        question: testQuestion
      }
    ]);

    getClassName.mockResolvedValue("Test Class");
    deleteQuestion.mockResolvedValue();
  });

  it("removes student from queue and navigates to home when leave button is clicked", async () => {
    // Render the component
    render(
      <BrowserRouter>
        <FormQueueView />
      </BrowserRouter>
    );

    // Fill in the form and submit
    const textboxes = screen.getAllByRole("textbox");
    const nameInput = textboxes[0];
    const questionInput = textboxes[1];
    fireEvent.change(nameInput, { target: { value: testStudent } });
    fireEvent.change(questionInput, { target: { value: testQuestion } });
    fireEvent.click(screen.getByRole("button", { name: /submit question/i }));

    // Wait for the queue to be populated
    await waitFor(() => {
      expect(screen.getByText(testStudent)).toBeInTheDocument();
      expect(screen.getByText(testQuestion)).toBeInTheDocument();
    });

    // Find and click the leave button
    const leaveButton = screen.getByRole("button", { name: /leave queue/i });
    fireEvent.click(leaveButton);

    // Verify the expected behaviors
    await waitFor(() => {
      // Verify confirmation dialog was shown
      expect(window.confirm).toHaveBeenCalledWith(
        "Are you sure you want to leave the queue?"
      );
      
      // Verify the question was deleted from Firebase
      expect(deleteQuestion).toHaveBeenCalledWith(questionId, "testCode");
      
      // Verify navigation to home page occurred
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});