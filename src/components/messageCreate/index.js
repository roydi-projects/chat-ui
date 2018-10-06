import React from 'react'
import PropTypes from 'prop-types';
import {
  Grid,
  Container,
  Input,
  TextArea,
  Button,
  Modal,
  Icon
} from 'semantic-ui-react';
import styled from 'styled-components';
import "../../index.scss";

const {Row, Column} = Grid;

const InputStyle = styled.div `
  textarea {
    min-width: 100%;
    max-width: 100%;
    resize: none;
    padding: 0 10px;
    margin-bottom: 5px;
  }
`;

const avatarUrls = [
  'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png'
];

class MessageCreate extends React.PureComponent {
  constructor(props) {
    super(props);

    this.initAvatar = this.initAvatar.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);

    this.state = {
      askUsername: false,
      avatar: null,
      message: '',
      username: ''
    };

    const avatar = localStorage.getItem('avatar');
    if (avatar) {
      this.state.avatar = avatar;
    } else {
      this.state.avatar = this.initAvatar();
    }

    const username = localStorage.getItem('username');
    if (username) {
      this.state.username = username;
      this.props.onSetUsername(this.state.username);
      this.props.sendMessage({
        system: true,
        avatar: this.state.avatar,
        username: this.state.username,
        text: 'connected to chat server! :)'
      });
    } else {
      this.state.askUsername = true;
    }
  }

  initAvatar() {
    const index = Math.floor(Math.random() * 5);
    const selectedAvatar = avatarUrls[index];
    localStorage.setItem('avatar', selectedAvatar);
    return selectedAvatar;
  }

  handleSendMessage() {
    const {message} = this.state;
    if (message) {
      this.props.sendMessage({avatar: this.state.avatar, username: this.state.username, text: message});
      this.setState({message: ''});
    }
  }

  render() {
    return <Container className={'message-create-container'}>
      <Modal open={this.state.askUsername}>
        <Modal.Header>Choose Username:</Modal.Header>
        <Modal.Content>
          <Input defaultValue={this.state.username} onChange={(e) => {
              this.setState({username: e.target.value});
            }} placeholder={'username'}/>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => {
              localStorage.setItem('username', this.state.username);
              this.props.onSetUsername(this.state.username);
              this.setState({askUsername: false});
              this.props.sendMessage({
                system: true,
                avatar: this.state.avatar,
                username: this.state.username,
                text: 'connected to chat server! :)'
              });
            }}>
            <Icon name='checkmark'/>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Grid>
        <Row>
          <Column width={2}>
            <img className={'avatar'} src={this.state.avatar} alt={this.state.avatar}/>
          </Column>
          <Column width={1}>
            <p className={'username'}>{this.state.username}:</p>
          </Column>
          <Column width={10}>
            <InputStyle>
              <TextArea value={this.state.message} placeholder={'Add a comment...'} onChange={(e) => {
                  this.setState({message: e.target.value});
                }}/>
            </InputStyle>
          </Column>
          <Column width={2}>
            <Button primary onClick={this.handleSendMessage} data-test="test-btn">
              Send
            </Button>
          </Column>
        </Row>
      </Grid>
    </Container>
  }
}

MessageCreate.propTypes = {
  onSetUsername: PropTypes.func,
  sendMessage: PropTypes.func,
};

export default MessageCreate;
