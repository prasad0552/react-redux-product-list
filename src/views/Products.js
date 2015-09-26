import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import ProductList from '../components/ProductList.js';
import SearchBox from '../components/SearchBox.js';
import Pagination from '../components/Pagination.js';
import {isLoaded as productsLoaded, load as loadProducts} from '../ducks/products';

@connect(
    state => (state.products))
export default class Products extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
    query: PropTypes.string,
    page: PropTypes.number
  }

  render() {
    const {products, loaded, loading, error, total, query, page} = this.props;

    let content;
    if (loaded) {
      content =
        <div>
          <div className="row">
            <Pagination {...{query, total, page}}/>
          </div>
          <ProductList products={products}/>
        </div>;
    } else if (loading) {
      content = <p>Loading...</p>
    } else if (error) {
      content = <p>{error}</p>
    } else {
      content = <p>Search for a product</p>
    }

    return (
      <div className="container">
        <DocumentMeta title="React Redux Example: Product Search"/>

        <h1>Products Search</h1>

        <div className="row">
          <SearchBox query={query}/>
        </div>

        <div className="row">
          {content}
        </div>
      </div>
    );
  }

  static fetchData(store, params, query) {
    if (!productsLoaded(store.getState(), query.q, query.page)) {
      return store.dispatch(loadProducts(query.q, parseInt(query.page, 10)));
    }
  }
}