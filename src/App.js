import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsPlay, BsPause } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import { CgFlag } from "react-icons/cg";

import "./App.css";

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [timeOfEachLap, setTimeOfEachLap] = useState({
    ms: 0,
    s: 0,
    m: 0,
    h: 0,
  });
  const [timeOfLap, setTimeOfLap] = useState([]);
  const [fakeInterval, setFakeInterval] = useState();
  const [fakeInterval2, setFakeInterval2] = useState();
  const [resetStatus, setResetStatus] = useState(false);
  const [playOrPause, setPlayOrPause] = useState(true);
  const [isPlay, setIsPlay] = useState(false);
  const [round, setRound] = useState([]);
  const [islap, setIsLap] = useState(false);
  const [isIslap, setIsIsLap] = useState(false);

  let updateMs = time.ms;
  let updateS = time.s;
  let updateM = time.m;
  let updateH = time.h;

  // RUN
  const run = () => {
    if (updateMs === 100) {
      updateS++;
      updateMs = 0;
    } else if (updateS === 60) {
      updateM++;
      updateS = 0;
    } else if (updateM === 60) {
      updateH++;
    }
    updateMs++;
    return setTime({ ms: updateMs, s: updateS, m: updateM, h: updateH });
  };
  let lapMs = time.ms;
  let lapS = time.s;
  let lapM = time.m;
  let lapH = time.h;
  // RUN LAP
  const runLap = () => {
    if (lapMs === 100) {
      lapS++;
      lapMs = 0;
    } else if (lapS === 60) {
      lapM++;
      lapS = 0;
    } else if (lapM === 60) {
      lapH++;
    }
    lapMs++;
    return setTimeOfEachLap({ ms: lapMs, s: lapS, m: lapM, h: lapH });
  };
  // START
  const start = () => {
    run();
    if (!isIslap) {
      runLap();
      setFakeInterval2(setInterval(runLap, 10));
    }
    setFakeInterval(setInterval(run, 10));
    setResetStatus(false);
    setPlayOrPause(false);
    setIsPlay(true);
  };

  // PAUSE
  const pause = () => {
    clearInterval(fakeInterval);
    clearInterval(fakeInterval2);
    setPlayOrPause(true);
  };

  // RESET
  const reset = () => {
    setPlayOrPause(true);
    setResetStatus(true);
    setIsLap(false);
    setIsIsLap(false);
  };
  // LAP
  const lap = () => {
    clearInterval(fakeInterval2);
    setRound((round) => [...round, timeOfEachLap]);
    lapMs = 0;
    lapS = 0;
    lapM = 0;
    lapH = 0;
    setIsIsLap(true);
    runLap();
    setFakeInterval2(setInterval(runLap, 10));
    setIsLap(true);
    setTimeOfLap((timeOfLap) => [...timeOfLap, time]);
  };
  // USE EFFECT
  useEffect(() => {
    if (resetStatus) {
      clearInterval(fakeInterval);
      clearInterval(fakeInterval2);
      setIsPlay(false);
      setIsLap(false);
      setTime({ ms: 0, s: 0, m: 0, h: 0 });
      setTimeOfEachLap({ ms: 0, s: 0, m: 0, h: 0 });
      setFakeInterval(0);
      setFakeInterval2(0);
      setRound([]);
      setTimeOfLap([]);
    }
  }, [resetStatus, fakeInterval, fakeInterval2]);

  return (
    <div className="container">
      <h2>Stopwatch</h2>
      <div className="col-lg-8">
        <div className="card-abe">
          <h1>
            {time.h} : {time.m} : {time.s} : {time.ms}
          </h1>
          <div className="button-abe">
            <div className="child-button-abe">
              {playOrPause ? (
                isPlay ? (
                  <>
                    <button onClick={start}>
                      <BsPlay />
                    </button>
                    <button onClick={reset}>
                      <BiReset />
                    </button>
                  </>
                ) : (
                  <button onClick={start}>
                    {" "}
                    <BsPlay />
                  </button>
                )
              ) : (
                <>
                  <button onClick={pause}>
                    <BsPause />
                  </button>
                  <button onClick={lap}>
                    <CgFlag />
                  </button>
                  <button onClick={reset}>
                    <BiReset />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {islap ? (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Time of each lap</th>
              <th scope="col">Time of lap</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {round.map((item, index) => {
              return (
                <tr
                  className={
                    item.s <= 10
                      ? "bg-success"
                      : item.s <= 15
                      ? "bg-warning"
                      : "bg-danger"
                  }
                  key={index}
                >
                  <th scope="row">{index + 1}</th>
                  <td>
                    + {item.h} : {item.m} : {item.s} : {item.ms}
                  </td>
                  <td>
                    {timeOfLap[index].h} : {timeOfLap[index].m} :{" "}
                    {timeOfLap[index].s} : {timeOfLap[index].ms}
                  </td>
                  <td>
                    {item.s <= 10
                      ? "Very Nice!"
                      : item.s <= 15
                      ? "Nice"
                      : "Nice Try!"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
