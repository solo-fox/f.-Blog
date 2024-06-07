import { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from "moment"; 

export default function DashboardInsightsTable({ activity }: Readonly<{ activity: string[] | null }>) {
  const [daysGrid, setDaysGrid] = useState<JSX.Element[]>([]);
  const [day, setDay] = useState<string>(`Today: ${moment().format("YYYY-MM-DD")}`);
  
  const showDay = (e) => { 
    setDay(e.target.id)
    setTimeout(()=>{
      setDay(`Today: ${moment().format("YYYY-MM-DD")}`)
    }, 1000)
  }
  
  useEffect(() => {
    if (!activity) return;

    let daysRecorded = activity;
    let dayGrids = [];
    const startDate = moment().startOf("year");
    const today = moment();
    const totalDays = today.diff(startDate, "days") + 1;

    for (let i = 0; i < totalDays; i++) {
      let dayGridDate = startDate.clone().add(i, "days").format("YYYY-MM-DD");
      if (daysRecorded.includes(dayGridDate)) {
        dayGrids.push(<Day id={dayGridDate} onClick={showDay} className="active day" key={i} />);
      } else {
        dayGrids.push(<Day id={dayGridDate} onClick={showDay} className="day" key={i} />);
      }
    }

    setDaysGrid(dayGrids);
  }, [activity]);

  return (
    <Activity>
      <p>
        {day}
      </p>
      <DayGridContainer>
        { daysGrid.length > 0 && (daysGrid)}
        { daysGrid.length == 0 && (
          <div className="no-activity">No Activity recorded yet!</div>
        )}
      </DayGridContainer>
    </Activity>
  );
}

const Activity = styled.div`
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;
text-align:center;
height:200px;
width: 50%;
background-color: #fff;
border-radius: 4px;
box-shadow: 0 15px 35px 0 rgba(42, 51, 83, 0.12), 0 5px 15px rgba(0, 0, 0, 0.06);
@media only screen and (max-width: 768px) {
  width:100%;
}
`

const Day = styled.div`
  height: 16px;
  background-color: #fef2d4;
  &:hover .day {
    transform: scale(1.1);
    border:1px solid #fef2d4;
  }
`;

const DayGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 16px);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 4px;
  grid-row-gap: 4px;
  padding:0px 2px 4px 4px;
  overflow: scroll;
  height: 100%;
  width:100%;
  position: relative;
  .active {
    background-color: #fbb60a;
  }
`;
