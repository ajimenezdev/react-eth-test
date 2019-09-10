import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

import AddressModal from "./index";
it("renders qrcode and address", () => {
  window.HTMLCanvasElement.prototype.getContext = () => {};
  const { getByLabelText, getByText } = render(
    <AddressModal
      visible={true}
      address="address1"
      network=""
      handleClose={() => {}}
    />
  );

  expect(getByLabelText("address")).toBeTruthy();
  expect(getByText("address1")).toBeTruthy();
  expect(getByLabelText("qrcode")).toBeTruthy();
});
