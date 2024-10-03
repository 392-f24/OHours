import api from './api';

const studentService = {
  verifyCode: (code) => {
    return api.post('/verify-code', { code });
  },
  
  // Add more student-related API calls here
  // For example:
  // getSchedule: () => {
  //   return api.get('/student/schedule');
  // },
};

export default studentService;