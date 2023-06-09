﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCData.Models
{
    public class Group : IItem
    {
        [Key]

        public int Id { get; set; }

        public string Name { get; set; }

        public GroupType Type { get; set; }

    }
}
