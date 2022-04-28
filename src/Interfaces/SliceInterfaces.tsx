import { User, Company, Post } from '../Interfaces/ObjectInterfaces';

export interface UsersState {
  usersList: User[]
};

export interface CompaniesState {
  companiesList: Company[]
};

export interface PostsState {
  postsList: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'deleted' | 'patched';
  error: string | null | undefined;
};