import {Activities} from "../types/activities.type";

export const activitiesApiMock: Activities.Entity[] = [
  {
    id: 'id1',
    title: 'Create Gmail Account',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur cum dolorum fugiat hic itaque molestias officiis sunt unde voluptate?\n',
    tag: 'Integration',
    status: 'done',
    estimation: {
      weeks: 0,
      days: 2,
      hours: 1.5
    }
  },
  {
    id: 'id2',
    title: 'Meeting With Product',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur cum dolorum fugiat hic itaque molestias officiis sunt unde voluptate?\n',
    tag: 'Meeting',
    status: 'done',
  },
  {
    id: 'id3',
    title: 'Create Notion Account',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur cum dolorum fugiat hic itaque molestias officiis sunt unde voluptate?\n',
    tag: 'Integration',
    status: 'done',
    estimation: {
      weeks: 3,
      days: 0,
      hours: 5
    }
  },
  {
    id: 'id4',
    title: 'Clone Repos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur cum dolorum fugiat hic itaque molestias officiis sunt unde voluptate?\n',
    tag: 'Code',
    status: 'in-progress',
  },
  {
    id: 'id5',
    title: 'Meeting with HR',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur cum dolorum fugiat hic itaque molestias officiis sunt unde voluptate?\n',
    tag: 'Meeting',
    status: 'in-progress',
    estimation: {
      weeks: 2,
      days: 6,
      hours: 23
    }
  },
  {
    id: 'id6',
    title: 'Serverless Course',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur cum dolorum fugiat hic itaque molestias officiis sunt unde voluptate?\n',
    tag: 'Learn',
    status: 'in-progress',
  },
  {
    id: 'id7',
    title: 'Navigation Feature',
    description: 'Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    tag: 'PR',
    status: 'backlog',
    estimation: {
      weeks: 0,
      days: 0,
      hours: 1
    }
  },
]
