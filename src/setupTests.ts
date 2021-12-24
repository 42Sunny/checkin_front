import "@testing-library/jest-dom";
import server from "./__test__/mocks/server";

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
