import 'server-only';
import type { ContactServiceAdapter } from './types';

// BLOCKED_INTEGRATION: verified Web3Forms recipient/account/access key and spam policy required.
// Deliberately no external POST, regardless of unrelated legacy environment variables.
export const contactService: ContactServiceAdapter = {
  provider: 'web3forms',
  async submit() { return { status: 'prototype', message: 'Local prototype: your inquiry is valid. It has not been sent or accepted by Web3Forms. Use the email link to contact the Studio.' }; },
};
