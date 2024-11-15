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

  beforeEach(() => {
    vi.clearAllMocks();
    router.useNavigate.mockImplementation(() => mockNavigate);
    window.confirm = vi.fn(() => true); // Mock confirm to always return true
    
    // Setup basic mock implementations
    getQueue.mockResolvedValue([]);
    getClassName.mockResolvedValue("Test Class");
    deleteQuestion.mockResolvedValue();
  });

  it("removes student from queue and navigates to home when leave button is clicked", async () => {
    // Setup: Mock adding a question to get into the queue first
    const questionId = "test-question-id";
    addQuestion.mockResolvedValueOnce(questionId);

    render(
      <BrowserRouter>
        <FormQueueView />
      </BrowserRouter>
    );

    // First submit a question to get into the queue
    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const questionInput = screen.getByPlaceholderText(/enter your question/i);
    
    fireEvent.change(nameInput, { target: { value: "Test Student" } });
    fireEvent.change(questionInput, { target: { value: "Test Question" } });
    
    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    // Wait for the question to be added
    await waitFor(() => {
      expect(addQuestion).toHaveBeenCalled();
    });

    // Now click the leave queue button
    const leaveButton = screen.getByText(/leave queue/i);
    fireEvent.click(leaveButton);

    // Verify the expected behaviors
    await waitFor(() => {
      // Verify the question was deleted from Firebase
      expect(deleteQuestion).toHaveBeenCalledWith(questionId.toString(), "testCode");
      
      // Verify navigation to home page occurred
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});