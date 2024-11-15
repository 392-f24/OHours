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

vi.mock("../src/firebase/studentSideFunctions", () => ({
  getQueue: vi.fn(),
  addQuestion: vi.fn(),
  updateQuestion: vi.fn(),
  deleteQuestion: vi.fn(),
  getClassName: vi.fn(),
}));

describe("FormQueueView", () => {
  it("should display original Question after submitting a question, allow editing, and cancel edit", async () => {
    const initialQuestion = "What is the capital of France?";
    const editedQuestion = "What is the capital of Spain?";

    addQuestion.mockResolvedValue("1");
    deleteQuestion.mockResolvedValue();
    getQueue.mockResolvedValue([
      { id: "1", name: "Student", question: initialQuestion },
    ]);

    render(
      <BrowserRouter>
        <FormQueueView />
      </BrowserRouter>
    );

    const textboxes = screen.getAllByRole("textbox");
    const nameInput = textboxes[0];
    const questionInput = textboxes[1];

    fireEvent.change(nameInput, { target: { value: "Student" } });

    fireEvent.change(questionInput, { target: { value: initialQuestion } });

    fireEvent.click(screen.getByRole("button", { name: /submit question/i }));

    await waitFor(() => {
      expect(screen.getByText(`${initialQuestion}`)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /edit question/i }));

    fireEvent.change(questionInput, { target: { value: editedQuestion } });

    fireEvent.click(screen.getByRole("button", { name: /cancel edit/i }));

    await waitFor(() => {
      expect(screen.getByText(`${initialQuestion}`)).toBeInTheDocument();
      expect(screen.queryByText(editedQuestion)).not.toBeInTheDocument();
    });
  });
});

describe("FormQueueView", () => {
  it("should display edited Question after submitting a question, allow editing, and submit", async () => {
    const initialQuestion = "What is the capital of France?";
    const editedQuestion = "What is the capital of Spain?";

    addQuestion.mockResolvedValue("1");
    deleteQuestion.mockResolvedValue();
    getQueue.mockResolvedValueOnce([
      { id: "1", name: "Student", question: initialQuestion },
    ]);
    updateQuestion.mockResolvedValueOnce();
    getQueue.mockResolvedValueOnce([
      { id: "1", name: "Student", question: editedQuestion },
    ]);

    render(
      <BrowserRouter>
        <FormQueueView />
      </BrowserRouter>
    );

    const textboxes = screen.getAllByRole("textbox");
    const nameInput = textboxes[0];
    const questionInput = textboxes[1];

    fireEvent.change(nameInput, { target: { value: "Student" } });

    fireEvent.change(questionInput, { target: { value: initialQuestion } });

    fireEvent.click(screen.getByRole("button", { name: /submit question/i }));

    await waitFor(() => {
      expect(screen.getByText(`${initialQuestion}`)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /edit question/i }));

    fireEvent.change(questionInput, { target: { value: editedQuestion } });

    // screen.debug();

    fireEvent.click(screen.getByRole("button", { name: /Save Changes/i }));

    // screen.debug();
    await waitFor(() => {
      expect(screen.getByText(`${editedQuestion}`)).toBeInTheDocument();
      expect(screen.queryByText(initialQuestion)).not.toBeInTheDocument();
    });
  });
});
