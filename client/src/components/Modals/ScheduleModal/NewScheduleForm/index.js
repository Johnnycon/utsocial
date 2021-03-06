import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFormValues, reset, SubmissionError } from 'redux-form';

import NewScheduleForm from './NewScheduleForm';
import * as scheduleActions from '../../../../redux/schedule';

class NewScheduleFormContainer extends Component {
  constructor(props) {
    super(props);

    this.resetTypes = this.resetTypes.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  resetTypes() {
    this.props.reset('addScheduleModalForm');
  }

  submitForm(values) {
    return this.props.addNewSchedule(values).then((result) => {
      if (result.payload.response && result.payload.response.status !== 200) {
        this.props.addNewScheduleError(result.payload.response.data);
        throw new SubmissionError({
          _error: result.payload.response.data.message
        });
      }
      this.props.addNewScheduleSucces(result.data);
    });
  }

  render() {
    return (
      <NewScheduleForm
        {...this.props}
        resetTypes={this.resetTypes}
        onSubmit={this.submitForm}
        asyncValidate={this.asyncValidate}
      />
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...scheduleActions, reset }, dispatch);

const mapStateToProps = state => ({
  selectedGroup: state.groups.selected,
  formValues: getFormValues('addScheduleModalForm')(state),
  initialValues: {
    group: state.schedule.group,
    semigroup: state.schedule.semigroup
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  NewScheduleFormContainer
);
