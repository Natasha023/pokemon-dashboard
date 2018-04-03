import * as React from 'react';

export interface ActionButtonProp {
  icon?: any,
  text?: string,
  hint?: string,
  isDanger?: boolean,
  onExecute?: () => void
}

export default class ActionButton extends React.Component<ActionButtonProp, object> {

    render() {
      const { icon, text, hint, isDanger, onExecute } = this.props;
      return (
        <button className="btn btn-link" onClick={onExecute} title={hint}>
          <span className={isDanger ? 'text-danger' : undefined}>
            {icon ? <i className={`glyphicon glyphicon-${icon}`} style={{ marginRight: text ? 5 : 0 }} /> : null}
            {text}
          </span>
      </button>
      );
    }
}