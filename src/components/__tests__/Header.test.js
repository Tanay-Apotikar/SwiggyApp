const { render, screen, fireEvent } = require("@testing-library/react");
import { Provider } from "react-redux";
import appStore from "../../../util/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should render Header Component with a login button", () => {
  render(
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>,
  );

  const loginButton = screen.getByRole("button", { name: "Login" });

  //   const loginButton = screen.getByText("Login");
  expect(loginButton).toBeInTheDocument();
});

it("Should render Header Component with Cart itme Zero", () => {
  render(
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>,
  );

  const cartItem = screen.getByText("Cart(0 items)");

  //   const loginButton = screen.getByText("Login");
  expect(cartItem).toBeInTheDocument();
});

it("Should change Login Button to Logout on Click", () => {
  render(
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>,
  );

  const loginButton = screen.getByRole("button", { name: /login/i });

  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole("button", { name: /logout/i });

  //   const loginButton = screen.getByText("Login");
  expect(logoutButton).toBeInTheDocument();
});
