import React from 'react';
import { Link } from "react-router-dom";
import User from '../models/User';
import Queue from '../models/Queue';

export default function QueueViewComponent(props: any) {

  let user: User = props.user;
  let queues: Queue[] = props.queues;

  function canSee(queue: Queue): boolean {
    return !queue.hiding || user !== null && (user.isAdministrator || user.isTeacherIn(queue.name));
  }

  function canClick(queue: Queue): boolean {
    return !queue.locked || user !== null && (user.isAdministrator || user.isTeacherIn(queue.name) || user.isTeachingAssistantIn(queue.name));
  }

  function queueCard(queue: Queue): JSX.Element {
    const styles = {marginTop: '2em', color: 'inherit'};

    if (queue.hiding) {
      styles.color = 'gray';
    }
    else if (queue.locked) {
      styles.color = 'red';
    }

    return (
      <div className="card" style={styles} key={queue.name}>
        <div className="card-body">
          {queue.hiding ? <i className="fas fa-eye-slash" style={{marginRight: '1em'}}></i> : null}
          {queue.locked ? <i className="fas fa-lock" style={{marginRight: '1em'}}></i> : null}
          {queue.name}
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>QueuePage</h1>
      <div className="container">
        {queues.map(queue =>
          canSee(queue)
          ? canClick(queue)
            ? <Link to={"/Queue/" + queue.name}>
                {queueCard(queue)}
              </Link>
            : queueCard(queue)
          : null
        )}
      </div>
    </>
  );

}
