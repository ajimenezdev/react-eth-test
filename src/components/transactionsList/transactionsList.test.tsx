import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import TransactionLists from "./index";

it("renders without crashing when no arguments", () => {
  const component = renderer.create(
    <TransactionLists
      transactions={[]}
      address=""
      network=""
      updating={false}
      onAddressClick={() => null}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders progress when updating=true", () => {
  act(() => {
    const { getByLabelText } = render(
      <TransactionLists
        transactions={[]}
        address=""
        network=""
        updating={true}
        onAddressClick={() => null}
      />
    );

    expect(getByLabelText("loading")).toBeVisible();
  });
});

it("renders items when transaction is not empty", () => {
  const { getAllByLabelText } = render(
    <TransactionLists
      transactions={[
        {
          nonce: 1,
          hash: "hash1",
          from: "address1",
          to: "address2",
          value: 10
        },
        {
          nonce: 2,
          hash: "hash2",
          from: "address1",
          to: "address2",
          value: 10000
        }
      ]}
      address="address1"
      network="Mainnet"
      updating={false}
      onAddressClick={() => null}
    />
  );

  expect(getAllByLabelText("list-tx-item"));
});

it("triggers callback when address clicked", () => {
  const mockCallback = jest.fn();
  const { getAllByLabelText } = render(
    <TransactionLists
      transactions={[
        {
          nonce: 1,
          hash: "hash1",
          from: "address1",
          to: "address2",
          value: 10
        },
        {
          nonce: 2,
          hash: "hash2",
          from: "address1",
          to: "address2",
          value: 10000
        }
      ]}
      address="address1"
      network="Mainnet"
      updating={false}
      onAddressClick={mockCallback}
    />
  );

  const address = getAllByLabelText("address_link")[0];
  act(() => {
    fireEvent.click(address);
  });
  expect(mockCallback.mock.calls.length).toBe(1);
});
