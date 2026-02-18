import { useState, useEffect } from "react";
import { User } from "@/data/mock-data";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface EditUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: User) => void;
  currentUserRole?: string; // The logged-in user's role
}

const EditUserDialog = ({ user, open, onOpenChange, onSave, currentUserRole }: EditUserDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { toast } = useToast();

  const isAdmin = currentUserRole === "Admin";

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;

    // Validation
    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Validation Error",
        description: "Valid email is required",
        variant: "destructive",
      });
      return;
    }

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      role: isAdmin ? role : user.role, // Only admin can change role
    };

    onSave(updatedUser);
    onOpenChange(false);

    toast({
      title: "User Updated",
      description: `${updatedUser.name} has been updated successfully`,
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form to original values
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information. {!isAdmin && "Only admins can change roles."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter user name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={role} 
              onValueChange={setRole}
              disabled={!isAdmin}
            >
              <SelectTrigger id="role" className={!isAdmin ? "opacity-50" : ""}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
              </SelectContent>
            </Select>
            {!isAdmin && (
              <p className="text-xs text-muted-foreground">
                Only administrators can change user roles
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">User ID</Label>
              <p className="text-sm font-mono">{user.id}</p>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">Created</Label>
              <p className="text-sm">{user.createdAt}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
