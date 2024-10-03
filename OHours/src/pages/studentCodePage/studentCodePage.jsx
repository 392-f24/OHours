import React, { useState } from 'react'; 
// import studentService from '../services/studentService';

const Alert = ({ children, className, ...props }) => (
  <div role="alert" className={`rounded-lg border p-4 ${className}`} {...props}>
    {children}
  </div>
);

const AlertDescription = ({ children, className, ...props }) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
    {children}
  </div>
);

export default function StudentPage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setLoading(true);
    // setStatus({ type: '', message: '' });

    // try {
    //   await studentService.verifyCode(code);
    //   setStatus({
    //     type: 'success',
    //     message: 'Code verified successfully!'
    //   });
    //   // Handle successful verification (e.g., show office hours schedule)
    // } catch (error) {
    //   setStatus({
    //     type: 'error',
    //     message: error.response?.data?.message || 'Invalid code. Please try again.'
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Student Access</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="code" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Access Code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your code here"
                required
              />
            </div>

            {status.message && (
              <Alert className={status.type === 'error' ? 'bg-red-50' : 'bg-green-50'}>
                <AlertDescription>
                  {status.message}
                </AlertDescription>
              </Alert>
            )}

            <button
              type="submit"
              disabled={loading || !code}
              className={`w-full py-2 px-4 rounded-md text-white font-medium
                ${loading || !code 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Verifying...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}