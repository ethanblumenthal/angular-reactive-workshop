import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProjectsActionTypes } from './projects.actions';
import { Project } from './../../projects/project.model';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
});

export function projectsReducers(state = initialState, action): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.SelectProject:
      return Object.assign({}, state, { selectedProjectId: action.payload });
    case ProjectsActionTypes.LoadProjects:
      return adapter.addMany(action.payload, state);
    case ProjectsActionTypes.AddProject:
      return adapter.addOne(action.payload, state);
    case ProjectsActionTypes.UpdateProject:
      return adapter.updateOne(action.payload, state);
    case ProjectsActionTypes.DeleteProject:
      return adapter.removeOne(action.payload, state);
    default:
      return state;
  }
}
