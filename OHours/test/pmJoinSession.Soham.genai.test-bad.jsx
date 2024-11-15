import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PMLanding } from '../src/pages/pmLanding/pmLanding';
import { useDbData } from '../src/firebase/firebaseDb';
import { fetchAllActiveSessions } from '../src/firebase/pmSideFunctions';
import '@testing-library/jest-dom';

// Mock the custom components
vi.mock('@components/Button', () => ({
    Button: ({ children, ...props }) => <button {...props}>{children}</button>
  }));
  
  vi.mock('@components/Input', () => ({
    Input: ({ ...props }) => <input {...props} />
  }));
  
  vi.mock('@components/back', () => ({
    default: () => <button>Back</button>
  }));
  
  vi.mock('@components/Cards', () => ({
    Card: ({ children, ...props }) => <div {...props}>{children}</div>
  }));
  
  vi.mock('@components/CardContent', () => ({
    CardContent: ({ children, ...props }) => <div {...props}>{children}</div>
  }));
  
  vi.mock('../src/pages/createSession/createSession', () => ({
    default: () => <div>Create Session Component</div>
  }));
  
  // Mock the custom hooks and Firebase functions
  vi.mock('../src/firebase/firebaseDb', () => ({
    useDbData: vi.fn(() => [{}, null])
  }));
  
  vi.mock('../src/firebase/pmSideFunctions', () => ({
    fetchAllActiveSessions: vi.fn()
  }));
  
  vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn()
  }));
  
  describe('PMLanding Table Component', () => {
    const mockSessions = {
      'session1': {
        className: 'Math 101',
        pmCode: 'PM123',
        queueLength: 5
      },
      'session2': {
        className: 'Physics 202',
        pmCode: 'PM456',
        queueLength: 3
      }
    };
  
    beforeEach(() => {
      // Reset all mocks before each test
      vi.clearAllMocks();
      
      // Setup mock implementations
      vi.mocked(fetchAllActiveSessions).mockImplementation(callback => callback(mockSessions, null));
    });
  
    it('renders the table headers correctly', async () => {
      render(<PMLanding />);
      
      expect(await screen.findByText('Session ID')).toBeInTheDocument();
      expect(await screen.findByText('Class Name')).toBeInTheDocument();
      expect(await screen.findByText('PM Code')).toBeInTheDocument();
      expect(await screen.findByText('Queue Length')).toBeInTheDocument();
    });
  
    it('renders the session data correctly', async () => {
      render(<PMLanding />);
      
      // Check if session 1 data is rendered
      expect(await screen.findByText('session1')).toBeInTheDocument();
      expect(await screen.findByText('Math 101')).toBeInTheDocument();
      expect(await screen.findByText('PM123')).toBeInTheDocument();
      expect(await screen.findByText('5')).toBeInTheDocument();
  
      // Check if session 2 data is rendered
      expect(await screen.findByText('session2')).toBeInTheDocument();
      expect(await screen.findByText('Physics 202')).toBeInTheDocument();
      expect(await screen.findByText('PM456')).toBeInTheDocument();
      expect(await screen.findByText('3')).toBeInTheDocument();
    });
  
    it('handles empty sessions data', async () => {
      // Mock empty sessions data
      vi.mocked(fetchAllActiveSessions).mockImplementation(callback => callback({}, null));
      
      render(<PMLanding />);
      
      // Headers should still be present
      expect(await screen.findByText('Session ID')).toBeInTheDocument();
      expect(await screen.findByText('Class Name')).toBeInTheDocument();
      expect(await screen.findByText('PM Code')).toBeInTheDocument();
      expect(await screen.findByText('Queue Length')).toBeInTheDocument();
      
      // Table body should be empty but present
      const tbody = screen.getByRole('rowgroup');
      expect(tbody).toBeInTheDocument();
      expect(tbody.children.length).toBe(0);
    });
  
    it('handles error in fetching sessions', async () => {
      // Mock error in fetching sessions
      const mockError = new Error('Failed to fetch sessions');
      vi.mocked(fetchAllActiveSessions).mockImplementation(callback => callback(null, mockError));
      
      const consoleSpy = vi.spyOn(console, 'log');
      render(<PMLanding />);
      
      // Check if error was logged
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching data:', mockError);
      
      // Table should still be rendered but empty
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });
