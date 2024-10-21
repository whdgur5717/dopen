import { Meta, StoryObj } from '@storybook/react';
import { Grass } from 'shared/ui/Grass';

export default {
  title: 'Grass',
  component: Grass,
} satisfies Meta<typeof Grass>;

type Story = StoryObj<typeof Grass>;

export const Primiary: Story = {};
