import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { act } from "@testing-library/react-hooks";
import { fireEvent, render, waitForElement } from "@testing-library/react";

import Form from "./index";

it("renders without crashing when no arguments", () => {
  const component = renderer.create(<Form onUpdateSearch={() => null} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("call onUpdateSearch when correct values", async () => {
  const mockCallback = jest.fn();
  const { getByLabelText, getAllByRole, container } = render(
    <Form onUpdateSearch={mockCallback} />
  );

  const address = getByLabelText("address");
  const network = getByLabelText("select_network");
  act(() => {
    fireEvent.change(address, {
      target: { value: "0xc350de406f54271c0e025bf72855418d65f8bcbc" }
    });
  });
  const selectButton = getAllByRole("button")[0];
  act(() => {
    fireEvent.click(selectButton);
  });
  await waitForElement(() => getByLabelText("select_network_mainnent"), {
    container
  });
  const mainnet = getByLabelText("select_network_mainnent");
  act(() => {
    fireEvent.click(mainnet);
  });

  act(() => {
    fireEvent.click(getByLabelText("search"));
  });

  expect(mockCallback.mock.calls.length).toBe(1);
});

it("do not call onUpdateSearch when wrong eth address", async () => {
  const mockCallback = jest.fn();
  const { getByLabelText, getAllByRole, container } = render(
    <Form onUpdateSearch={mockCallback} />
  );

  const address = getByLabelText("address");
  const network = getByLabelText("select_network");
  fireEvent.change(address, {
    target: { value: "wrong_address" }
  });
  const selectButton = getAllByRole("button")[0];
  fireEvent.click(selectButton);
  await waitForElement(() => getByLabelText("select_network_mainnent"), {
    container
  });
  const mainnet = getByLabelText("select_network_mainnent");
  fireEvent.click(mainnet);

  await fireEvent.click(getByLabelText("search"));

  expect(mockCallback.mock.calls.length).toBe(0);
});

it("do not call onUpdateSearch when empty", () => {
  const mockCallback = jest.fn();
  const { getByLabelText } = render(<Form onUpdateSearch={mockCallback} />);

  fireEvent.click(getByLabelText("search"));

  expect(mockCallback.mock.calls.length).toBe(0);
});
