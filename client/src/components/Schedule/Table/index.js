import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Table from './Table';
import * as modalActions from '../../../redux/modals';
import { MODALS } from '../../../constants';

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(event) {
    const hour = event.target.getAttribute('data-hour');
    const week = event.target.getAttribute('data-week');
    const semigroup = event.target.getAttribute('data-semigroup');

    const customProps = {
      hour,
      week,
      semigroup
    };
    this.props.showModal(MODALS.ADD_SCHEDULE, customProps);
  }

  render() {
    return <Table {...this.props} handleCellClick={this.handleCellClick} />;
  }
}

const mapStateToProps = state => ({
  schedule: state.schedule
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...modalActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
