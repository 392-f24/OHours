import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
// only the above import statement is needed for jest-dom to work 

expect.extend(matchers);
 