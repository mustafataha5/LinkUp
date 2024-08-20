import React from 'react';
import './FollowerSidebar.css';

const followers = [
  { id: 1, firstName: 'John', lastName: 'Doe', profilePic: 'path/to/john.jpg' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', profilePic: 'path/to/jane.jpg' },
  { id: 3, firstName: 'Alice', lastName: 'Johnson', profilePic: 'path/to/alice.jpg' },
];

const FollowerSidebar = () => {
  return (
    <div className="follower-sidebar">
      <h2>Followers</h2>
      <ul>
        {followers.map(follower => (
          <li key={follower.id} className="follower-item">
            <img src={follower.profilePic} alt={follower.name} className="profile-pic" />
            <span className="follower-name">{follower.firstName} {follower.lastName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowerSidebar;
