/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total } from './style';
import * as CartAction from '../../store/Modules/Cart/Action';

function Cart({ cart, removeFromCart, updateAmountRequest, total }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title} </strong>
                <span>{product.priceFormatted} </span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button">
                  <MdDelete
                    size={20}
                    color="#7159c1"
                    onClick={() => removeFromCart(product.id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedidos</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
const mapStateToProps = (state) => ({
  cart: state.Cart.map((product) => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.Cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartAction, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
