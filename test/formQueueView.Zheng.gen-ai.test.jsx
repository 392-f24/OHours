import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import FormQueueView from "../src/pages/formQueue/formQueueView";
import { BrowserRouter } from "react-router-dom";
import {
  getQueue,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../src/firebase/studentSideFunctions";

// Mocking Firebase functions
vi.mock("../src/firebase/studentSideFunctions", () => ({
  getQueue: vi.fn(),
  addQuestion: vi.fn(),
  updateQuestion: vi.fn(),
  deleteQuestion: vi.fn(),
  getClassName: vi.fn(),
}));

// Utility function to render component
const renderComponent = () =>
  render(
    <BrowserRouter>
      <FormQueueView />
    </BrowserRouter>
  );

describe("FormQueueView", () => {
  it("should display the original question after submission, allow editing, and cancel edit", async () => {
    const initialQuestion = "What is the capital of France?";
    const editedQuestion = "What is the capital of Spain?";

    // Mock API responses
    addQuestion.mockResolvedValue("1");
    deleteQuestion.mockResolvedValue();
    getQueue.mockResolvedValue([
      { id: "1", name: "Student", question: initialQuestion },
    ]);

    renderComponent();

    // Fill out the form and submit
    const [nameInput, questionInput] = screen.getAllByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Student" } });
    fireEvent.change(questionInput, { target: { value: initialQuestion } });
    fireEvent.click(screen.getByRole("button", { name: /submit question/i }));

    // Verify question is displayed
    await waitFor(() => {
      expect(screen.getByText(initialQuestion)).toBeInTheDocument();
    });

    // Edit question and cancel
    fireEvent.click(screen.getByRole("button", { name: /edit question/i }));
    fireEvent.change(questionInput, { target: { value: editedQuestion } });
    fireEvent.click(screen.getByRole("button", { name: /cancel edit/i }));

    // Verify original question remains unchanged
    await waitFor(() => {
      expect(screen.getByText(initialQuestion)).toBeInTheDocument();
      expect(screen.queryByText(editedQuestion)).not.toBeInTheDocument();
    });
  });

  it("should display the edited question after submission and editing", async () => {
    const initialQuestion = "What is the capital of France?";
    const editedQuestion = "What is the capital of Spain?";

    // Mock API responses
    addQuestion.mockResolvedValue("1");
    deleteQuestion.mockResolvedValue();
    getQueue
      .mockResolvedValueOnce([
        { id: "1", name: "Student", question: initialQuestion },
      ])
      .mockResolvedValueOnce([
        { id: "1", name: "Student", question: editedQuestion },
      ]);
    updateQuestion.mockResolvedValueOnce();

    renderComponent();

    // Fill out the form and submit
    const [nameInput, questionInput] = screen.getAllByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Student" } });
    fireEvent.change(questionInput, { target: { value: initialQuestion } });
    fireEvent.click(screen.getByRole("button", { name: /submit question/i }));

    // Verify question is displayed
    await waitFor(() => {
      expect(screen.getByText(initialQuestion)).toBeInTheDocument();
    });

    // Edit question and save
    fireEvent.click(screen.getByRole("button", { name: /edit question/i }));
    fireEvent.change(questionInput, { target: { value: editedQuestion } });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    // Verify edited question is displayed
    await waitFor(() => {
      expect(screen.getByText(editedQuestion)).toBeInTheDocument();
      expect(screen.queryByText(initialQuestion)).not.toBeInTheDocument();
    });
  });
});
