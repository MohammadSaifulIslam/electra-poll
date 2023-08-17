import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { next } from '../../../redux/slices/PageNumSlice';
import { addFirstPage } from '../../../redux/slices/FormDataSlice';
import { useState } from 'react';
import { setAdminResultAccess, setBallotAcces, setSelectedTime, setVoteType, setVoterResultAccess } from '../../../redux/slices/OverviewSlice';

const Overview = () => {

    const pageNum = useSelector(s => s.pageNum.page)
    const formData = useSelector(s => s.formData)
    const overviewStates = useSelector(s => s.overview)
    const selectedTime = overviewStates.selectedTime
    const selectedVoteType = overviewStates.voteType
    const selectedBallotAccess = overviewStates.ballotAccess
    const adminResultAccess = overviewStates.adminResultAccess
    const voterResultAccess = overviewStates.voterResultAccess
    const dispatch = useDispatch()

    useEffect(() => {
        if (formData.autoDate) {
            dispatch(setSelectedTime('option1'))
        } else if (formData.startDate) {
            dispatch(setSelectedTime('option2'));
        }
        console.log(selectedTime);
    }, [formData]);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    console.log(errors);
    const onSubmit = data => {
        let payload = {
            title: data.title,
            autoDate: selectedTime === 'option1' ? data.autoDate : '',
            startDate: selectedTime === 'option2' ? data.startDate : '',
            endDate: selectedTime === 'option2' ? data.endDate : '',
            voteType: selectedVoteType,
            ballotAccess: selectedBallotAccess,
            adminResultAccess,
            voterResultAccess,
            adminEmail: data.adminEmail,
            organization: data.organization
        };
        dispatch(addFirstPage(payload));
        dispatch(next());

    }


    const handleselectedTime = option => {
        if (option === 'option2') {
            dispatch(addFirstPage({
                title: formData.title,
                autoDate: '', // clear autoDate
                startDate: formData.startDate,
                endDate: formData.endDate
            }));
        } else if (option === 'option1') {
            dispatch(addFirstPage({
                title: formData.title,
                autoDate: formData.autoDate,
                startDate: '', // clear startDate
                endDate: ''   // clear endDate
            }));
        }

        dispatch(setSelectedTime(option))
    }

    return (
        <div className='lg:w-[70%] w-full bg-gray-50 p-3 lg:p-10'>
            <h1 className='text-2xl font-bold pb-3'>Vote Details</h1>
            {/* errors */}
            {Object.keys(errors).length !== 0 &&
                <div className='bg-red-100 border-l-4 h-20 flex items-center text-lg border-red-600'>
                    <ul className='list-decimal ps-6'>
                        {errors.title && <li>Election Title can't be blank</li>}
                        {errors.autoDate && <li>Please select in how many minutes the elction will end</li>}
                        {errors.startDate && <li>Please add starting date and time</li>}
                        {errors.endDate && <li>Please add ending date and time</li>}
                    </ul>
                </div>
            }

            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                {/* -------title------- */}
                <div className="form-control">
                    <label className="label">
                        <span className="text-lg font-semibold">Election Title <span className='text-red-400'>&#9998;</span></span>
                    </label>
                    <input {...register("title", { required: true })} placeholder="election title" type='text'
                        defaultValue={formData.title || ''} className="my-input focus:outline-green-400" />
                </div>

                {/* -------election date------- */}
                <div className="form-control">
                    <label className="pb-1">
                        <span className="text-lg font-semibold">select election date and time <span className='text-red-400'>&#9998;</span></span>
                    </label>
                    <div>
                        <label className='block mb-4 cursor-pointer'>
                            <input
                                type="radio"
                                defaultValue="option1"
                                className='transform scale-150 me-3'
                                checked={selectedTime === 'option1' || formData.autoDate || selectedTime === ''}
                                onChange={(e) => handleselectedTime(e.target.value)}
                            />
                            manually start and end after <input disabled={selectedTime === 'option2'} {...register('autoDate', { required: selectedTime === 'option1', min: 3, max: 60 })} defaultValue={formData.autoDate || 10} className='border h-10 px-2 ms-4 w-14' type='number'></input> minutes
                        </label>
                        <label>
                            <input
                                type="radio"
                                defaultValue="option2"
                                className='transform scale-150 me-3 mb-3'
                                checked={selectedTime === 'option2' || formData.startDate}
                                onChange={(e) => handleselectedTime(e.target.value)}
                            />
                            select starting and ending time
                        </label>
                    </div>
                    {
                        (selectedTime === 'option2' || formData.startDate) && <>
                            <label className="pb-1">
                                <span className="text-md font-semibold">starting time</span>
                            </label>
                            <input disabled={selectedTime === 'option1' || formData.autoDate} {...register("startDate", { required: selectedTime === 'option2' })} placeholder="Photo URL" type='datetime-local' defaultValue={formData.startDate || ''} className="my-input ms-5 focus:outline-green-400" />

                            <label className="pb-1">
                                <span className="text-md font-semibold">ending time</span>
                            </label>
                            <input disabled={selectedTime === 'option1' || formData.autoDate} {...register("endDate", { required: selectedTime === 'option2' })} placeholder="Photo URL" type='datetime-local' defaultValue={formData.endDate || ''} className="my-input ms-5 focus:outline-green-400" />
                        </>
                    }
                </div>

                {/* -------organization------ */}
                <div className="form-control">
                    <label className="label">
                        <span className="text-lg font-semibold">Organization<span className='text-red-400'>&#9998;</span></span>
                    </label>
                    <input {...register("organization", { required: true })} placeholder="Photo URL" type='text'
                        defaultValue={'abcd'} className="my-input focus:outline-green-400" />
                </div>

                {/* ------primary email-------- */}
                <div className="form-control">
                    <label className="lebel pb-1">
                        <span className="text-lg font-semibold">Primary email as orginizar <span className='text-red-400'>&#9998;</span></span>
                        <p className='text-sm'>voters can contact this email for any inquery or help</p>
                    </label>
                    <input {...register("adminEmail", { required: true })} placeholder="primary email" type='text'
                        defaultValue={'codeCreafter@gmail.com'} className="my-input focus:outline-green-400" />
                </div>

                <h1 className='text-2xl font-semibold py-2'>Vote Security</h1>

                {/* ---------vote type---------- */}
                <div className="form-control">
                    <label className="lebel pb-1">
                        <span className="text-lg font-semibold">Select vote type<span className='text-red-400'>&#9998;</span></span>
                    </label>

                    <label className='pb-3'>
                        <input
                            type="radio"
                            value="test"
                            className={`transform scale-150 me-3`}
                            checked={selectedVoteType === 'test'}
                            onChange={(e) => dispatch(setVoteType(e.target.value))}
                        />
                        Test
                        <p className='text-sm ps-7'>try a test election with max 5 voters</p>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="live"
                            className='transform scale-150 me-3'
                            checked={selectedVoteType === 'live'}
                            onChange={(e) => dispatch(setVoteType(e.target.value))}
                        />
                        Live
                        <p className='text-sm ps-7'>live vote with unlimited voters</p>
                    </label>
                </div>

                {/* ----------voter access to ballot-------- */}
                <div className="form-control">
                    <label className="lebel pb-1">
                        <span className="text-lg font-semibold">Voter access to ballot<span className='text-red-400'>&#9998;</span></span>
                    </label>
                    <label className='pb-3'>
                        <input
                            type="radio"
                            value="high"
                            className={`transform scale-150 me-3`}
                            checked={selectedBallotAccess === 'high'}
                            onChange={(e) => dispatch(setBallotAcces(e.target.value))}
                        />
                        High Validation
                        <p className='text-sm ps-7'>electraPoll will create uniqe access key and password for each voter.</p>
                    </label>
                    <label className='pb-3'>
                        <input
                            type="radio"
                            value="medium"
                            className={`transform scale-150 me-3`}
                            checked={selectedBallotAccess === 'medium'}
                            onChange={(e) => dispatch(setBallotAcces(e.target.value))}
                        />
                        Medium Validation
                        <p className='text-sm ps-7'>administrator will manually create uniqe access key and password for each voter.</p>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="low"
                            className='transform scale-150 me-3'
                            checked={selectedBallotAccess === 'low'}
                            onChange={(e) => dispatch(setBallotAcces(e.target.value))}
                        />
                        Low Validation
                        <p className='text-sm ps-7'>A common link for every voter. voters can submit multiple ballots.</p>
                    </label>
                </div>


                {/* -------administrator access to result-------- */}
                <div className="form-control">
                    <label className="lebel pb-1">
                        <span className="text-lg font-semibold">Administrator Access to result<span className='text-red-400'>&#9998;</span></span>
                    </label>

                    <label className='pb-3'>
                        <input
                            type="radio"
                            value="anytime"
                            className={`transform scale-150 me-3`}
                            checked={adminResultAccess === 'anytime'}
                            onChange={(e) => dispatch(setAdminResultAccess(e.target.value))}
                        />
                        Anytime after the vote starts
                    </label>
                    <label className='pb-3'>
                        <input
                            type="radio"
                            value="after"
                            className={`transform scale-150 me-3`}
                            checked={adminResultAccess === 'after'}
                            onChange={(e) => dispatch(setAdminResultAccess(e.target.value))}
                        />
                        Only after the vote ends
                    </label>
                </div>

                {/* -------Voter access to result-------- */}
                <div className="form-control">
                    <label className="lebel pb-1">
                        <span className="text-lg font-semibold">Voter Access to result<span className='text-red-400'>&#9998;</span></span>
                    </label>

                    <label className={`pb-3 ${adminResultAccess !== 'anytime' ? 'opacity-50' : 'placeholder:'}`}>
                        <input
                            type="radio"
                            value="anytime"
                            className={`transform scale-150 me-3`}
                            checked={voterResultAccess === 'anytime'}
                            disabled={adminResultAccess !== 'anytime'}
                            onChange={(e) => dispatch(setVoterResultAccess(e.target.value))}
                        />
                        Anytime after the vote starts
                    </label>
                    <label className='pb-3'>
                        <input
                            type="radio"
                            value="after"
                            className={`transform scale-150 me-3`}
                            checked={voterResultAccess === 'after'}
                            onChange={(e) => dispatch(setVoterResultAccess(e.target.value))}
                        />
                        Only after the vote ends
                    </label>
                    <label className='pb-3'>
                        <input
                            type="radio"
                            value="none"
                            className={`transform scale-150 me-3`}
                            checked={voterResultAccess === 'none'}
                            onChange={(e) => dispatch(setVoterResultAccess(e.target.value))}
                        />
                        Voter has no access to result
                    </label>
                </div>

                <div className='pt-5 flex justify-end'>
                    <button type='submit' className='button-next'>Next</button>
                </div>
            </form >
        </div >
    );
};

export default Overview;