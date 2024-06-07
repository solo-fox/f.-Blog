import styled from 'styled-components'

export default function Notice({message, handleEmailVerification, level}) {
  return (
    <div onClick={handleEmailVerification} className="bg-yellow-100 border border-yellow-600 rounded-md text-center p-2">
      {message}
    </div>
  )
}