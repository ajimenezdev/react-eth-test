import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddressSummary from "./index";

it("renders without crashing when no arguments", () => {
  const component = renderer.create(
    <AddressSummary
      address=""
      network=""
      balance={0}
      updating={false}
      onAddressClick={() => null}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders progress when updating=true", () => {
  const { getByLabelText } = render(
    <AddressSummary
      address=""
      network=""
      balance={0}
      updating={true}
      onAddressClick={() => null}
    />
  );

  expect(getByLabelText("loading")).toBeVisible();
});

it("renders address and balance", () => {
  const { getByText } = render(
    <AddressSummary
      address="0xc350de406f54271c0e025bf72855418d65f8bcbc"
      network="mainnet"
      balance={1000000000000000000}
      updating={false}
      onAddressClick={() => null}
    />
  );

  expect(getByText("0xc350de406f54271c0e025bf72855418d65f8bcbc")).toBeVisible();
  expect(getByText("1 ETH")).toBeVisible(); // check balance is displayed and translated from wei to eth
});
