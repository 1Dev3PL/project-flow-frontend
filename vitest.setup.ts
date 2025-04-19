import "@testing-library/jest-dom";
import axios from "axios";

axios.defaults.adapter = 'http'

window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
}));
