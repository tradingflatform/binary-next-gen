import React, { PureComponent, PropTypes } from 'react';
import { M, InputGroup, LogoSpinner, Legend, Button, Option,
	Error, DateOfBirth, Countries } from 'binary-components';
import { api } from '../_data/LiveData';
import SecretQuestion from './SecretQuestion';

export default class UpgradeCard extends PureComponent {

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			progress: false,
			validatedOnce: '',
			salutation: 'Mr',
			firstName: '',
			lastName: '',
			residence: '',
			addressCity: '',
			addressLine1: '',
			phone: '',
			secretQuestion: '',
			secretAnswer: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		const { router } = this.context;
		if (nextProps.upgrade.get('success')) {
			router.push('/');
		}
	}

	onEntryChange = e =>
        this.setState({ [e.target.id]: e.target.value });

	onFirstNameValid = firstName =>
		/^[a-zA-Z\s'.-]{2,30}$/.test(firstName);

	onLastNameValid = lastName =>
		/^[a-zA-Z\s'.-]{2,30}$/.test(lastName);

	onDayChange = e =>
		this.setState({ day: e.target.value });

	onMonthChange = e =>
		this.setState({ month: e.target.value });

	onYearChange = e =>
		this.setState({ year: e.target.value });

	onCountryChange = e =>
		this.setState({ residence: e.target.value });

	onStateChange = e =>
		this.setState({ addressState: e.target.value });

	onCityChange = e =>
		this.setState({ addressCity: e.target.value });

	onPostcodeChange = e =>
		this.setState({ addressPostcode: e.target.value });

	onAddressLine1Change = e =>
		this.setState({ addressLine1: e.target.value });

	onAddressLine2Change = e =>
		this.setState({ addressLine2: e.target.value });

	onPhoneChange = e =>
		this.setState({ phone: e.target.value });

	onSecretQuestionChange = e =>
		this.setState({ secretQuestion: e.target.value });

	onSecretAnswerChange = e =>
		this.setState({ secretAnswer: e.target.value });

	onTermsAndConditionsChanged = e =>
		this.setState({ termsAndConditions: e.target.value });

    onFormSubmit = e => {
        e.preventDefault();
        this.setState({
            validatedOnce: true,
        });
        if (this.allValid) {
            this.performUpgrade();
        }
    }

    performUpgrade = async () => {
        const { salutation, firstName, lastName, residence,
			addressLine1, addressLine2, addressCity, addressState,
			addressPostcode, secretQuestion, secretAnswer, phone } = this.state;

        try {
            this.setState({
                progress: true,
                serverError: false,
            });
            const response = await api.createRealAccount({
                salutation,
				first_name: firstName,
				last_name: lastName,
				date_of_birth: '1980-01-31',
				residence,
				address_line_1: addressLine1,
				address_line_2: addressLine2,
				address_city: addressCity,
				address_state: addressState,
				address_postcode: addressPostcode,
				phone,
				secret_question: secretQuestion,
				secret_answer: secretAnswer,
            });
			localStorage.setItem('account', JSON.stringify({ token: response.new_account_real.oauth_token }));
            window.location = '/';
        } catch (error) {
            this.setState({ serverError: error.message });
        } finally {
            this.setState({
                progress: false,
            });
        }
    }

	render() {
		const { firstName, lastName, residence, addressLine1, addressCity, secretQuestion, secretAnswer,
			phone, termsAndConditions, progress, serverError, validatedOnce } = this.state;

		const firstNameIsValid = firstName.length >= 2;
		const lastNameIsValid = lastName.length >= 2;
		const residenceIsValid = residence.length > 0;
		const addressCityIsValid = addressCity.length > 0;
		const addressLine1IsValid = addressLine1.length > 0;
		const phoneIsValid = phone.length >= 6;
		const secretQuestionIsValid = secretQuestion.length > 0;
		const secretAnswerIsValid = secretAnswer.length > 0;
		this.allValid = firstNameIsValid && lastNameIsValid && residenceIsValid && addressCityIsValid &&
			addressLine1IsValid && phoneIsValid && secretQuestionIsValid && secretAnswerIsValid && termsAndConditions;

		return (
			<div className="upgrade-card" >
				<div className="full-logo">
					<LogoSpinner spinning={progress} />
					<img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
				</div>
				{serverError &&
					<Error text={serverError} />
				}
				<form onSubmit={this.onFormSubmit}>
					<Legend text="Personal Information" />
					<div className="input-row names-row">
						<select id="salutation" onChange={this.onEntryChange}>
							<Option value="Mr" text="Mr" />
							<Option value="Mrs" text="Mrs" />
							<Option value="Ms" text="Ms" />
							<Option value="Miss" text="Miss" />
						</select>
						<InputGroup
							id="firstName"
							placeholder="First Name"
							type="text"
							onChange={this.onEntryChange}
							maxLength="30"
						/>
						<InputGroup
							id="lastName"
							placeholder="Last Name"
							type="text"
							onChange={this.onEntryChange}
							maxLength="30"
						/>
					</div>
					{validatedOnce && !(firstNameIsValid && lastNameIsValid) &&
						<Error text="Enter your first and last name" />
					}
					<div className="input-row">
						{/* <Label htmlFor="dobdd" text="Date of birth" /> */}
						<DateOfBirth
							onDayChange={this.onDayChange}
							onMonthChange={this.onMonthChange}
							onYearChange={this.onYearChange}
						/>
					</div>
					<Legend text="Home Address" />
					<div className="input-row">
						<Countries onChange={this.onCountryChange} />
						<select onChange={this.onStateChange}>
							{[].map(x => (
								<option key={x.value} value={x.value}>{x.text}</option>
							))}
						</select>
					</div>
					{validatedOnce && !residenceIsValid &&
						<Error text="Choose your country" />
					}
					<div className="input-row">
						<InputGroup
							name="AddressTown"
							placeholder="Town/City"
							type="text"
							maxLength="35"
							onChange={this.onCityChange}
						/>
						<InputGroup
							name="AddressPostcode"
							placeholder="Postal Code / ZIP"
							type="text"
							maxLength="20"
							onChange={this.onPostcodeChange}
						/>
					</div>
					{validatedOnce && !addressCityIsValid &&
						<Error text="City must not be empty" />
					}
					<div className="input-row">
						<InputGroup
							name="Address1"
							placeholder="Address First Line"
							type="text"
							maxLength="70"
							onChange={this.onAddressLine1Change}
						/>
					</div>
					{validatedOnce && !addressLine1IsValid &&
						<Error text="Address must not be empty" />
					}
					<div className="input-row">
						<InputGroup
							name="Address2"
							placeholder="Address Second Line"
							type="text"
							maxLength="70"
							onChange={this.onAddressLine2Change}
						/>
					</div>
					<div className="input-row">
						<InputGroup
							name="Tel"
							placeholder="Phone"
							type="tel"
							maxLength="35"
							onChange={this.onPhoneChange}
						/>
					</div>
					{validatedOnce && !phoneIsValid &&
						<Error text="Enter a valid phone number" />
					}
					<Legend text="Security" />
					<div className="input-row">
						<SecretQuestion onChange={this.onSecretQuestionChange} />
						<InputGroup
							name="secretanswer"
							placeholder="Answer To Secret Question"
							type="text"
							maxLength="50"
							onChange={this.onSecretAnswerChange}
						/>
					</div>
					{validatedOnce && !secretQuestionIsValid &&
						<Error text="Select a secret question" />
					}
					{validatedOnce && !secretAnswerIsValid &&
						<Error text="Secret answer must be at least 4 characters" />
					}
					<div className="input-row">
						<label htmlFor="tnc">
							<input
								id="tnc"
								name="tnc"
								type="checkbox"
								onClick={this.onTermsAndConditionsChanged}
							/>
							<M m="I agree to the" />&nbsp;
							<a href="https://binary.com/terms-and-conditions" target="_blank" rel="noopener noreferrer">
								<M m="terms and conditions" />
							</a>
						</label>
					</div>
					{validatedOnce && !termsAndConditions &&
						<Error text="You need to agree to our Terms and Conditions" />
					}
					<Button disabled={progress || validatedOnce && !this.allValid} text="Open Account" />
				</form>
			</div>
		);
	}
}
