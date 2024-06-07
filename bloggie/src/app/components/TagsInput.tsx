"use client"

import styled from 'styled-components'

export default function TagsInput({
  tags, setTags
}) {
  function handleKeyDown(e) {
    // If user did not press enter key, return
    if (e.keyCode != 13) return
    // Get the value of the input
    const value = e.target.value
    // If the value is empty, return
    if (!value.trim()) return
    // Add the value to the tags array
    setTags([...tags, value])
    // Clear the input
    e.target.value = ''
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index))
  }

  return (
    <TagsInputContainer>
      { tags.map((tag, index) => (
        <TagItem key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)} >&times;</span>
        </TagItem>
      )) }
      <Input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Keywords"/>
    </TagsInputContainer>
  )
}

  const TagsInputContainer = styled.div`
  padding: 0.5em;
  border-radius: 3px;
  width:200px;
  display: flex;
  align-items: center;
  gap: 0.5em;
  overflow:scroll;
  `;

  const TagItem = styled.div`
  background-color: lightgray;
  display: flex;
  padding: 0.5px 2px;
  justify-content:space-between;
  align-items:center;
  border-radius:4px;
  margin-left:1px;
  min-width:40px;
  overflow:hidden;
  `;

  const CloseButton = styled.span`
  height: 20px;
  width: 20px;
  background-color: rgb(48, 48, 48);
  color: #fff;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  cursor: pointer;
  `;

  const Input = styled.input`
  padding: 0.25rem;
  border: none;
  width:150px;
  outline: none;
  `;