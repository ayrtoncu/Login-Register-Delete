import React, { FC } from 'react';

interface MessageProps {
  msg: string;
  type: 'peligro' | 'correcto';
}

const Message: FC<MessageProps> = ({ msg, type }) => {
  let typeCLass = '';
  if (type === 'peligro') {
    typeCLass = 'es-peligro';
  }

  if (type === 'correcto') {
    typeCLass = 'es-correcto'
  }
  return (
    <article className={`message ${typeCLass}`}>
      <div className='message-body'>{msg} </div>
    </article>
  )
}
export default Message;