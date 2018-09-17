import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import './api/users.test';
import './api/notes.test';
import './ui/TitleBar.test';
import './ui/Login.test';
import './ui/Signup.test';
import './ui/NoteListItem.test';
import './ui/NoteListHeader.test';
import './ui/NoteList.test';
import './ui/Editor.test';
