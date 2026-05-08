"use client";

import { Save } from "lucide-react";
import type { FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import type { ActionType, Branch, BusinessType, GymPlan, Lead, Member, Trainer, WorkoutTemplate } from "@/lib/types";
import { currency } from "@/lib/utils";

type ActionState = {
  type: ActionType;
  context?: string;
};

type ActionModalProps = {
  action: ActionState;
  members: Member[];
  trainers: Trainer[];
  plans: GymPlan[];
  workoutTemplates: WorkoutTemplate[];
  branches: Branch[];
  leads: Lead[];
  businessType: BusinessType | null;
  selectedBranchId: string;
  dailyPin: string;
  onClose: () => void;
  onSubmit: (action: ActionState, values: Record<string, FormDataEntryValue>) => void;
};

const titles: Record<ActionType, string> = {
  "add-member": "Add Member",
  "add-trainer": "Add Trainer",
  announcement: "Send Announcement",
  pin: "Generate Daily PIN",
  "assign-workout": "Assign Workout Plan",
  "collect-fee": "Collect Fees",
  "diet-note": "Assign Diet Notes",
  measurements: "Record Measurements",
  "transformation-photo": "Upload Transformation Photo",
  "trainer-reminder": "Send Reminder",
  plan: "Create Gym Plan",
  "support-ticket": "Create Support Ticket",
  "add-lead": "Add Lead",
  "convert-lead": "Convert Lead",
  "add-staff": "Create Staff User",
  "record-check-in": "Record Check-in"
};

export function ActionModal({
  action,
  members,
  trainers,
  plans,
  workoutTemplates,
  branches,
  leads,
  businessType,
  selectedBranchId,
  dailyPin,
  onClose,
  onSubmit
}: ActionModalProps) {
  const contextMember = members.find((member) => member.id === action.context);
  const contextTemplate = workoutTemplates.find((template) => template.id === action.context);
  const contextLead = leads.find((lead) => lead.id === action.context);
  const defaultMemberId = contextMember?.id ?? members[0]?.id ?? "";
  const defaultTemplateId = contextTemplate?.id ?? workoutTemplates[0]?.id ?? "";
  const defaultPlan = plans.find((plan) => plan.id === contextMember?.planId) ?? plans[0];
  const feeAmount = contextMember ? (contextMember.pendingFees > 0 ? contextMember.pendingFees : defaultPlan?.price ?? 0) : 2499;
  const branchSelect = (
    <label>
      Branch
      <select name="branchId" defaultValue={contextMember?.branchId ?? contextLead?.branchId ?? selectedBranchId}>
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
    </label>
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSubmit(action, Object.fromEntries(form.entries()));
  }

  return (
    <Modal
      title={titles[action.type]}
      onClose={onClose}
      footer={
        <>
          <button className="ghost-button" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-button" type="submit" form="action-form">
            <Save size={16} aria-hidden="true" />
            Save
          </button>
        </>
      }
    >
      <form className="field-grid" id="action-form" onSubmit={handleSubmit}>
        {action.type === "add-member" ? (
          <>
            {businessType === "multi-branch" ? branchSelect : <input name="branchId" value={selectedBranchId} type="hidden" />}
            <label>
              Full name
              <input name="name" defaultValue="Tanay Kulkarni" required />
            </label>
            <label>
              Email
              <input name="email" defaultValue="tanay@apexfit.demo" type="email" required />
            </label>
            <label>
              Phone
              <input name="phone" defaultValue="+91 98765 55210" required />
            </label>
            <label>
              Goal
              <input name="goal" defaultValue="Muscle gain and consistency" required />
            </label>
            <label>
              Plan
              <select name="planId" defaultValue={plans[0]?.id}>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - {currency(plan.price)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Trainer
              <select name="trainerId" defaultValue={trainers[0]?.id}>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : null}

        {action.type === "add-trainer" ? (
          <>
            {businessType === "multi-branch" ? branchSelect : <input name="branchId" value={selectedBranchId} type="hidden" />}
            <label>
              Trainer name
              <input name="name" defaultValue="Mira Joshi" required />
            </label>
            <label>
              Email
              <input name="email" defaultValue="mira@apexfit.demo" type="email" required />
            </label>
            <label>
              Specialty
              <input name="specialty" defaultValue="Mobility, kettlebells, and beginner strength" required />
            </label>
          </>
        ) : null}

        {action.type === "announcement" ? (
          <>
            <label>
              Title
              <input name="title" defaultValue="May challenge starts tomorrow" required />
            </label>
            <label>
              Audience
              <select name="audience" defaultValue="All">
                <option>All</option>
                <option>Owners</option>
                <option>Trainers</option>
                <option>Students</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="body" defaultValue="Log your workout daily and earn bonus leaderboard points all month." required />
            </label>
          </>
        ) : null}

        {action.type === "pin" ? (
          <>
            <div className="glass-card">
              <span className="fine-print">Current PIN</span>
              <div className="metric-value">{dailyPin}</div>
              <p className="muted">Saving will rotate the PIN, notify staff, and make the old PIN invalid for member check-ins.</p>
            </div>
            <input name="rotate" value="true" type="hidden" />
          </>
        ) : null}

        {action.type === "assign-workout" ? (
          <>
            <label>
              Member
              <select name="memberId" defaultValue={contextMember?.id ?? defaultMemberId}>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Workout template
              <select name="templateId" defaultValue={contextTemplate?.id ?? defaultTemplateId}>
                {workoutTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name} - {template.difficulty}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : null}

        {action.type === "collect-fee" ? (
          <>
            <label>
              Member
              <select name="memberId" defaultValue={defaultMemberId}>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} - {member.pendingFees > 0 ? `due ${currency(member.pendingFees)}` : "renew plan"}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {contextMember?.pendingFees === 0 ? "Renewal amount" : "Amount"}
              <input name="amount" defaultValue={feeAmount} inputMode="numeric" required />
            </label>
            <label>
              Method
              <select name="method" defaultValue="UPI">
                <option>UPI</option>
                <option>Cash</option>
                <option>Card</option>
              </select>
            </label>
          </>
        ) : null}

        {action.type === "diet-note" ? (
          <>
            <label>
              Member
              <select name="memberId" defaultValue={defaultMemberId}>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Coach note
              <textarea name="note" defaultValue="Keep protein above 120g today and finish dinner two hours before sleep." required />
            </label>
          </>
        ) : null}

        {action.type === "measurements" ? (
          <>
            <label>
              Member
              <select name="memberId" defaultValue={defaultMemberId}>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Weight kg
              <input name="weightKg" defaultValue={contextMember?.weightKg ?? 72.5} inputMode="decimal" required />
            </label>
            <label>
              Chest cm
              <input name="chestCm" defaultValue="101" inputMode="decimal" required />
            </label>
            <label>
              Waist cm
              <input name="waistCm" defaultValue="80" inputMode="decimal" required />
            </label>
            <label>
              Hip cm
              <input name="hipCm" defaultValue="96" inputMode="decimal" required />
            </label>
            <label>
              PR record
              <input name="pr" defaultValue="Squat 90kg for 5 reps" required />
            </label>
          </>
        ) : null}

        {action.type === "transformation-photo" ? (
          <>
            <label>
              Member
              <select name="memberId" defaultValue={defaultMemberId}>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Label
              <input name="label" defaultValue="Current check-in" required />
            </label>
            <label>
              Photo file
              <input name="photo" type="file" accept="image/*" />
            </label>
          </>
        ) : null}

        {action.type === "trainer-reminder" ? (
          <>
            <label>
              Reminder text
              <textarea name="body" defaultValue="Your plan update is ready. Please review before the evening slot." required />
            </label>
            <input name="context" type="hidden" value={action.context ?? ""} />
          </>
        ) : null}

        {action.type === "plan" ? (
          <>
            <label>
              Plan name
              <input name="name" defaultValue="Elite PT 24" required />
            </label>
            <label>
              Category
              <select name="category" defaultValue="Personal Training">
                <option>Membership</option>
                <option>Personal Training</option>
              </select>
            </label>
            <label>
              Duration days
              <input name="durationDays" defaultValue="90" inputMode="numeric" required />
            </label>
            <label>
              Price
              <input name="price" defaultValue="24999" inputMode="numeric" required />
            </label>
            <label>
              Offer
              <input name="offer" defaultValue="24 sessions plus monthly progress review" required />
            </label>
          </>
        ) : null}

        {action.type === "support-ticket" ? (
          <>
            <label>
              Gym
              <input name="gymName" defaultValue="ApexFit Baner" required />
            </label>
            <label>
              Ticket title
              <input name="title" defaultValue="Need subscription invoice copy" required />
            </label>
            <label>
              Priority
              <select name="priority" defaultValue="Medium">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
          </>
        ) : null}

        {action.type === "add-lead" ? (
          <>
            {businessType === "multi-branch" ? branchSelect : <input name="branchId" value={selectedBranchId} type="hidden" />}
            <label>
              Lead name
              <input name="name" defaultValue="Aditya Kulkarni" required />
            </label>
            <label>
              Phone
              <input name="phone" defaultValue="+91 98765 41820" required />
            </label>
            <label>
              Source
              <select name="source" defaultValue="Instagram">
                <option>Walk-in</option>
                <option>Instagram</option>
                <option>Referral</option>
                <option>Website</option>
              </select>
            </label>
            <label>
              Goal
              <input name="goal" defaultValue="Trial session and monthly membership" required />
            </label>
            <label>
              Estimated value
              <input name="estimatedValue" defaultValue="6499" inputMode="numeric" required />
            </label>
          </>
        ) : null}

        {action.type === "convert-lead" ? (
          <>
            <input name="leadId" value={contextLead?.id ?? leads[0]?.id ?? ""} type="hidden" />
            <div className="glass-card">
              <span className="fine-print">Lead</span>
              <div className="metric-value">{contextLead?.name ?? "Selected lead"}</div>
              <p className="muted">Saving converts this lead into a member and creates the first pending membership payment.</p>
            </div>
            <label>
              Plan
              <select name="planId" defaultValue={plans[0]?.id}>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - {currency(plan.price)}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : null}

        {action.type === "add-staff" ? (
          <>
            {businessType === "multi-branch" ? branchSelect : <input name="branchId" value={selectedBranchId} type="hidden" />}
            <label>
              Staff name
              <input name="name" defaultValue="Nikhil Pawar" required />
            </label>
            <label>
              Email
              <input name="email" defaultValue="staff@apexfit.demo" type="email" required />
            </label>
            <label>
              Role
              <select name="role" defaultValue="Receptionist">
                <option>Manager</option>
                <option>Receptionist</option>
                <option>Trainer</option>
                <option>Accountant</option>
              </select>
            </label>
          </>
        ) : null}

        {action.type === "record-check-in" ? (
          <>
            <label>
              Member
              <select name="memberId" defaultValue={defaultMemberId}>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Source
              <select name="source" defaultValue="frontdesk">
                <option value="frontdesk">Front desk</option>
                <option value="trainer">Trainer</option>
                <option value="pin">PIN</option>
              </select>
            </label>
          </>
        ) : null}
      </form>
    </Modal>
  );
}
