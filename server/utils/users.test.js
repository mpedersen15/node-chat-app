const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Matt',
			room: 'Students'
		},{
			id: '2',
			name: 'Ryan',
			room: 'Teachers'
		},{
			id: '3',
			name: 'Luke',
			room: 'Students'
		}]
	});
	
	it ('should add a new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Matt',
			room: 'Students'
		};
		
		var resUser = users.addUser(user.id, user.name, user.room);
		
		expect(users.users).toEqual([user]);
	});
	
	it ('should remove a user', () => {
		var deletedUser = users.removeUser('1');
		
		expect(deletedUser).toEqual({
			id: '1',
			name: 'Matt',
			room: 'Students'
		});
		expect(users.users.length).toBe(2);
	});
	
	it ('should not remove a user', () => {
		var deletedUser = users.removeUser('0');
		
		expect(deletedUser).toNotExist();
		expect(users.users.length).toBe(3);
	});
	
	it ('should return user', () => {
		var user = users.getUser('1');
		
		expect(user).toEqual(users.users[0]);
	});
	
	it ('should not return user', () => {
		var user = users.getUser('0');
		
		expect(user).toNotExist();
	});
	
	it ('should return names for students room', () => {
		var userList = users.getUserList('Students');
		
		expect(userList).toEqual(['Matt', 'Luke']);
	});
	
	it ('should return names for teachers room', () => {
		var userList = users.getUserList('Teachers');
		
		expect(userList).toEqual(['Ryan']);
	});
	
})