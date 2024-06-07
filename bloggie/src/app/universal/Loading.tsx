import styled from "styled-components"

export default function Loading() {
  return (
    <Loader>
      <p>f.</p>
    </Loader>
  )
}

  const Loader = styled.div`
  z-index:4;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top:0px;
  right:0px;
  align-items:center;
  justify-content:center;
  background:white;
  display:flex;
  font-family: "League Spartan", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  font-size: 80px;
  color: #cd5334ff;
  `