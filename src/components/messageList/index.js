import React from 'react'
import PropTypes from 'prop-types';
import {Container} from 'semantic-ui-react'
import "../../index.scss";

class MessageList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messages.length !== nextProps.messages) {
      this.setState({
        messages: this.ChatParse(nextProps.messages)
      });
    }
  }

  ChatParse(messagesArr) {
    return messagesArr.map((messageObj, key) => {
      let rowClassName = 'other-message-row';
      if (messageObj.username === this.props.selectedUsername && !messageObj.system) {
        rowClassName = 'my-message-row';
      } else if (messageObj.system) {
        rowClassName = 'system-message-row';
      }
      return (<div key={key} className={`${rowClassName} message-row`}>
        <img className={'avatar'} alt={messageObj.avatar} src={messageObj.avatar}/>
        <p className={'message'}>
          <span className={'username'}>{messageObj.username}:</span> {messageObj.text}
        </p>
      </div>);
    });
  }

  render() {
    return <Container className={'message-list-container'}>
      <div className={'chat-area'}>
        {this.state.messages}
      </div>
    </Container>
  }
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  selectedUsername: PropTypes.string.isRequired
};

export default MessageList;
