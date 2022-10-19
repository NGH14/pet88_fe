import React from 'react';
import './style.css';

function TermOfUse() {
	return (
		<div style={{ marginInline: '50px' }}>
			<div className='tac_title'>
				<div className='tac_title-heading'>
					<h2>Terms &amp; Conditions </h2>
					<i
						style={{
							fontSize: '0.45em',
							color: '#999',
							opacity: '0.7',
						}}>
						Dated: April 16, 2022
					</i>
				</div>
			</div>
			<div className='tac_content'>
				<h2 className='tac_content-heading'>1. Introduction</h2>
				<p className='tac_content-text'>
					Thank you for utilizing the UIM platform, which is a secure
					web-enabled role-based system for gathering improvement
					ideas from a major university's personnel.
				</p>
			</div>
			<div className='tac_content'>
				<h2 className='tac_content-heading'>2. Who may use the UIM</h2>
				<p className='tac_content-text'>
					The target users of UIM is University staffs who can express
					they ideas which very important to improving the university
					organization
				</p>
			</div>
			<div className='tac_content'>
				<h2 className='tac_content-heading'>
					3. The services UIM provide
				</h2>
				<p className='tac_content-text'>
					The Service helps you to discover, view, and materialize the
					idea that helps improve the university. It also serves as a
					forum for people the university to interact, inform, and
					inspire one another.
				</p>
			</div>
			<div className='tac_content'>
				<h2 className='tac_content-heading'>
					4. Information you share with UIM
				</h2>
				<p className='tac_content-text'>
					We need specific information from you in order to provide
					you with our services. For example, in order to submit or
					discuss content ideas on UIM, you must first create an
					account. When you choose to share the information below with
					us, we gather and utilize it to run and improve the
					university's services, among other things.
				</p>
			</div>
			<div className='tac_content'>
				<h2 className='tac_content-heading'>
					5. UIM uses your information to
				</h2>
				<p className='tac_content-text'>
					We use your information to authorize and authenticate your
					permission in UIM, also used in the application UI to
					identify who you are.
				</p>
			</div>
			<div className='tac_title'>
				<div className='tac_title-heading'>
					<i
						style={{
							fontSize: '0.45em',
							color: '#999',
							opacity: '0.7',
						}}>
						Effective as of April 16, 2022
					</i>
				</div>
			</div>
		</div>
	);
}

export default React.memo(TermOfUse);
