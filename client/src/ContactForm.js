import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineError from './InlineError';

class ContactForm extends Component {
	state = {
		data: {
			name: '',
			company: '',
			sender: '',
			recipient: '',
			phone: '',
			message: ''
		},
		loading: false,
		errors: {},
		successMsg: ''
	};

	onSubmit = e => {
		e.preventDefault();
		
		const errors = this.validate(this.state.data);
		
		this.setState({ errors });

		const isValid = Object.keys(errors).length === 0;

		if (isValid) { 
			
			const { data } = this.state;

			const formValues = {
				name: data.name,
				company: data.company,
				sender: data.sender,
				recipient: data.recipient,
				phone: data.phone,
				message: data.message
			};

			console.log( formValues );

			axios.get(`/contact?name=${data.name}&company=${data.company}&sender=${data.sender}&recipient=${data.recipient}&phone=${data.phone}&message=${data.message}`)
				.then(function (response) {
					console.log(response.data);
				    console.log(response.status);
				    console.log(response.statusText);
				    console.log(response.headers);
				    console.log(response.config);
					})
					.catch(function (error) {
					console.log(error);
					});

  			this.setState({	successMsg: 'Thank you! Your email has been sent!' });
  			
			this.setState({ loading: true });
			
		}

		// clear form values after sending
		this.setState({
			data: {
				name: '',
				company: '',
				sender: '',
				recipient: '',
				phone: '',
				message: ''
			},
			loading: false
		});

	}

	onChange = e => 
		this.setState({ 
			...this.state, 
			data: { ...this.state.data, [e.target.name]: e.target.value } 
		});

	validate = data => {
		const errors = {};

		if (!isEmail(data.sender)) errors.sender = "Invalid email";
		if (!isEmail(data.recipient)) errors.recipient = "Invalid email";
		if (!data.message) errors.message = "Required field";
		if (!data.phone) errors.phone = "Required field";
		if (!data.company) errors.company = "Required field";
		if (!data.name) errors.name = "Required field";

		return errors;
	};

	render() {
		const { data, loading, errors, successMsg } = this.state;
		
		return (
			<div>
				<h1>Contact Us!</h1>
				<p style={{ color: 'red', fontWeight: 'bold' }}>{successMsg}</p>
				<Form onSubmit={this.onSubmit} loading={loading}>

				<Form.Field error={!!errors.name}>
					<label htmlFor="name">Name</label>
					<input 
						type="text" 
						id="name" 
						name="name" 
						placeholder="Your name"
						value={data.name} 
						onChange={this.onChange} 
					/>
					{errors.name && <InlineError text={errors.name} />}
				</Form.Field>

				<Form.Field error={!!errors.sender}>
					<label htmlFor="sender">From Email</label>
					<input 
						type="email" 
						id="sender" 
						name="sender" 
						placeholder="Sender email"
						autoComplete="email"
						value={data.sender} 
						onChange={this.onChange} 
					/>
					{errors.sender && <InlineError text={errors.sender} />}
				</Form.Field>

				<Form.Field error={!!errors.recipient}>
					<label htmlFor="recipient">To Email</label>
					<input 
						type="email" 
						id="recipient" 
						name="recipient" 
						placeholder="Recipient email"
						autoComplete="email"
						value={data.recipient} 
						onChange={this.onChange} 
					/>
					{errors.recipient && <InlineError text={errors.recipient} />}
				</Form.Field>

				<Form.Field error={!!errors.company}>
					<label htmlFor="company">Company</label>
					<input 
						type="text" 
						id="company" 
						name="company" 
						placeholder="Your company"
						value={data.company} 
						onChange={this.onChange} 
					/>
					{errors.company && <InlineError text={errors.company} />}
				</Form.Field>			

				<Form.Field error={!!errors.phone}>
					<label htmlFor="phone">Phone</label>
					<input 
						type="text" 
						id="phone" 
						name="phone" 
						placeholder="Your phone number"
						value={data.phone} 
						onChange={this.onChange} 
					/>
					{errors.phone && <InlineError text={errors.phone} />}
				</Form.Field>

				<Form.Field error={!!errors.message}>
					<label htmlFor="message">Message</label>
					<textarea 
						placeholder="Your message" 
						value={data.message}
						name="message"
						rows="5" 
						onChange={this.onChange}
					></textarea>
					{errors.message && <InlineError text={errors.message} />}
				</Form.Field>

				<Button primary>Send Message</Button>		
			</Form> 
			</div>

		); 
	}
}

export default ContactForm;
