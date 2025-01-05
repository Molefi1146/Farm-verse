import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const collaborationSchema = z.object({
  experience: z.string().min(1, 'Experience is required'),
  motivation: z.string().min(1, 'Motivation is required'),
  commitment: z.string().min(1, 'Commitment level is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  investmentAmount: z.number().min(1, 'Investment amount is required'),
});

interface CollaborationFormProps {
  type: string;
  onSubmit: (data: any) => void;
}

export default function CollaborationForm({ type, onSubmit }: CollaborationFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(collaborationSchema),
  });

  const skills = [
    'Farming',
    'Agriculture Technology',
    'Project Management',
    'Financial Management',
    'Marketing',
    'Sustainability',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Relevant Experience
        </label>
        <textarea
          {...register('experience')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Describe your relevant experience..."
        />
        {errors.experience && (
          <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Motivation
        </label>
        <textarea
          {...register('motivation')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Why do you want to join this project?"
        />
        {errors.motivation && (
          <p className="mt-1 text-sm text-red-600">{errors.motivation.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Time Commitment
        </label>
        <select
          {...register('commitment')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select commitment level</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="advisory">Advisory (as needed)</option>
        </select>
        {errors.commitment && (
          <p className="mt-1 text-sm text-red-600">{errors.commitment.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Relevant Skills
        </label>
        <div className="mt-2 space-y-2">
          {skills.map((skill) => (
            <label key={skill} className="flex items-center">
              <input
                type="checkbox"
                value={skill}
                {...register('skills')}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">{skill}</span>
            </label>
          ))}
        </div>
        {errors.skills && (
          <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
        )}
      </div>

      {type === 'investor' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Investment Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              {...register('investmentAmount', { valueAsNumber: true })}
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="0.00"
            />
          </div>
          {errors.investmentAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.investmentAmount.message}</p>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}