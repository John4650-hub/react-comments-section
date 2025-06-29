import React from 'react';

import { GlobalContext } from '../../context/Provider'
import Picker from 'emoji-picker-react'
import './InputField.scss'
import TextareaAutosize from 'react-textarea-autosize';


function useOutsideAlerter(ref: any, setOpen: Function) {
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(!open)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

interface EmojiInputProps {
  text: string
  setText: Function
  mode?: string
  inputStyle?: object
  placeHolder?: string
}

const EmojiInput = ({
  text,
  setText,
  mode,
  inputStyle,
  placeHolder
}: EmojiInputProps) => {
  const [open, setOpen] = React.useState(false)
  const [chosenEmoji, setChosenEmoji] = React.useState<{ emoji?: any }>()
  const wrapperRef = React.useRef(null)
  useOutsideAlerter(wrapperRef, setOpen)

  const globalStore: any = React.useContext(GlobalContext)

  React.useEffect(() => {
    if (chosenEmoji) {
      let newText = text + ' ' + chosenEmoji.emoji
      setText(newText)
    }
  }, [chosenEmoji])

  const onEmojiClick = (event: any, emojiObject: { emoji?: any }) => {
    event
    setChosenEmoji(emojiObject)
  }

  return (
    <div className='emoji-input'>
      <TextareaAutosize
        maxRows={6}
        minRows={1}
        cols={40}
        className='postComment'
        style={
          mode === 'replyMode' || mode === 'editMode'
            ? globalStore.replyInputStyle
            : globalStore.inputStyle || inputStyle
        }
        placeholder={placeHolder ? placeHolder : 'Type your reply here.'}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='emoji-icon' onClick={() => setOpen(!open)}></div>
      {open ? (
        <div ref={wrapperRef}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      ) : null}
    </div>
  )
}

export default EmojiInput
