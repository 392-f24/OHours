import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
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
  }
});

// Mock the Firebase functions
vi.mock("../src/firebase/studentSideFunctions", () => ({
  getQueue: vi.fn(),
  addQuestion: vi.fn(),
  updateQuestion: vi.fn(),
  deleteQuestion: vi.fn(),
  getClassName: vi.fn(),
}));

describe("FormQueueView", () => {
  it("should display question in queue after submission", async () => {
    const newQuestion = "how to do question 2?";
    const newStudent = "bobby";

    addQuestion.mockResolvedValue("1");
    getQueue.mockResolvedValue([
      { id: "1", name: newStudent, question: newQuestion },
    ]);

    render(
      <BrowserRouter>
        <FormQueueView />
      </BrowserRouter>
    );

    const textboxes = screen.getAllByRole("textbox");
    const nameInput = textboxes[0];
    const questionInput = textboxes[1];

    fireEvent.change(nameInput, { target: { value: newStudent } });
    fireEvent.change(questionInput, { target: { value: newQuestion } });
    fireEvent.click(screen.getByRole("button", { name: /submit question/i }));

    await waitFor(() => {
      expect(screen.getByText(`${newQuestion}`)).toBeInTheDocument();
      expect(screen.getByText(`${newStudent}`)).toBeInTheDocument();
    });
  });


  it("when a student clicks leave the queue button + confirm, they are sent back to the home page and removed from the queue", async () => {
    const newQuestion = "how to do question 2?";
    const newStudent = "bobby";
    const existingStudents = [
      { id: "1", name: "Alice", question: "Help with assignment" },
      { id: "2", name: "Bob", question: "Clarify lecture notes" },
      { id: "3", name: newStudent, question: newQuestion },
    ];
  
    // Mock the necessary functions
    addQuestion.mockResolvedValue("3");
    getQueue.mockResolvedValue(existingStudents);
    deleteQuestion.mockResolvedValue();
    const navigateMock = vi.fn();
    vi.spyOn(router, "useNavigate").mockReturnValue(navigateMock);
  
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
    fireEvent.change(nameInput, { target: { value: newStudent } });
    fireEvent.change(questionInput, { target: { value: newQuestion } });
    fireEvent.click(screen.getByRole("button", { name: /submit question/i }));
  
    // Wait for the queue to be updated
    await waitFor(() => {
      expect(screen.getByText(`${newQuestion}`)).toBeInTheDocument();
      expect(screen.getByText(`${newStudent}`)).toBeInTheDocument();
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  
    window.confirm = vi.fn().mockReturnValue(true);
    fireEvent.click(screen.getByRole("button", { name: /leave queue/i }));
  
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalled();
      expect(deleteQuestion).toHaveBeenCalled();
    });
  });

  it("when a student clicks leave the queue button + cancel, they remain on the page and nothing is changed", async () => {
    vi.resetAllMocks();
    const newQuestion = "how to do question 2?";
    const newStudent = "bobby";
    const existingStudents = [
      { id: "1", name: "Alice", question: "Help with assignment" },
      { id: "2", name: "Bob", question: "Clarify lecture notes" },
      { id: "3", name: newStudent, question: newQuestion },
    ];
  
    // Mock the necessary functions
    addQuestion.mockResolvedValue("3");
    getQueue.mockResolvedValue(existingStudents);
    deleteQuestion.mockResolvedValue(existingStudents);
    const navigateMock = vi.fn();
    vi.spyOn(router, "useNavigate").mockReturnValue(navigateMock);
  
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
    fireEvent.change(nameInput, { target: { value: newStudent } });
    fireEvent.change(questionInput, { target: { value: newQuestion } });
    fireEvent.click(screen.getByRole("button", { name: /submit question/i }));
  
    // Wait for the queue to be updated
    await waitFor(() => {
      expect(screen.getByText(`${newQuestion}`)).toBeInTheDocument();
      expect(screen.getByText(`${newStudent}`)).toBeInTheDocument();
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
    
    window.confirm = vi.fn().mockReturnValue(false);
    fireEvent.click(screen.getByRole("button", { name: /leave queue/i }));
    
  
    await waitFor(() => {
      expect(screen.getByText(`${newQuestion}`)).toBeInTheDocument();
      expect(screen.getByText(`${newStudent}`)).toBeInTheDocument();
      expect(navigateMock).not.toHaveBeenCalled();
      expect(deleteQuestion).not.toHaveBeenCalled();
    });
  });
});